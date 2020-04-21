const RobinHoodCoop = artifacts.require('RobinHoodCoop')
const RobinHoodShare = artifacts.require('RobinHoodShare')
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const { expect } = require('chai')
const { ZERO_ADDRESS } = constants

contract('RobinHoodCoop', ([root, admin, member]) => {
  beforeEach(async () => {
    this.coop = await RobinHoodCoop.new()
  })

  context('# initialize', () => {
    beforeEach('!! initialize RobinHoodCoop', async () => {
      this.receipt = await this.coop.initialize({ from: root })
    })

    it('it deploys share ERC20 contract', async () => {
      expect(await this.coop.share()).to.not.equal(ZERO_ADDRESS)
    })

    it('it grants msg.sender admin role', async () => {
      expect(await this.coop.isAdmin(root), true)
    })

    it("it emits a 'GrantedAdmin' event", async () => {
      expectEvent(this.receipt, 'GrantedAdmin', { admin: root })
    })

    it('it reverts on re-initialization', async () => {
      await expectRevert(this.coop.initialize({ from: root }), 'Contract instance has already been initialized.')
    })
  })

  context('# updateValue', () => {
    const value = new BN('200')

    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
    })

    context('» msg.sender is an admin', () => {
      beforeEach('!! update value', async () => {
        this.receipt = await this.coop.updateValue(value, { from: root })
      })

      it('it updates value', async () => {
        expect(await this.coop.value()).to.be.bignumber.equal(value)
      })

      it("it emits a 'UpdatedValue' event", async () => {
        expectEvent(this.receipt, 'UpdatedValue', { value })
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.updateValue(value, { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# grantAdmin', () => {
    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
    })

    context('» msg.sender is an admin', () => {
      beforeEach('!! grant admin', async () => {
        this.receipt = await this.coop.grantAdmin(admin, { from: root })
      })

      context('» granted address is not already an admin', () => {
        it('it grants address admin role', async () => {
          expect(await this.coop.isAdmin(admin)).to.equal(true)
        })

        it("it emits a 'GrantedAdmin' event", async () => {
          expectEvent(this.receipt, 'GrantedAdmin', { admin })
        })
      })

      context('» granted address is already an admin', () => {
        it('it reverts', async () => {
          await expectRevert(this.coop.grantAdmin(admin, { from: root }), 'ALREADY_AN_ADMIN')
        })
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.grantAdmin(admin, { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# revokeAdmin', () => {
    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
    })

    beforeEach('!! grant admin', async () => {
      await this.coop.grantAdmin(admin, { from: root })
    })

    context('» msg.sender is an admin', () => {
      context('» revoked address is not msg.sender', () => {
        context('» revoked address is an admin', () => {
          beforeEach('!! revoke admin', async () => {
            this.receipt = await this.coop.revokeAdmin(admin, { from: root })
          })

          it('it revokes address admin role', async () => {
            expect(await this.coop.isAdmin(admin)).to.equal(false)
          })

          it("it emits a 'RevokedAdmin' event", async () => {
            expectEvent(this.receipt, 'RevokedAdmin', { admin })
          })
        })

        context('» revoked address is not an admin', () => {
          it('it reverts', async () => {
            await expectRevert(this.coop.revokeAdmin(member, { from: admin }), 'NOT_AN_ADMIN')
          })
        })
      })

      context('» revoked address is msg.sender', () => {
        it('it reverts [and prevents coop to end up with no admin]', async () => {
          await expectRevert(this.coop.revokeAdmin(admin, { from: admin }), 'ADMIN_CANNOT_REVOKE_HERSELF')
        })
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.revokeAdmin(admin, { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# mint', () => {
    const amount = new BN('350')

    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
      this.share = await RobinHoodShare.at(await this.coop.share())
    })

    context('» msg.sender is an admin', () => {
      beforeEach('!! mint', async () => {
        this.receipt = await this.coop.mint(member, amount, { from: root })
      })

      it('it mints share', async () => {
        expect(await this.share.balanceOf(member)).to.be.bignumber.equal(amount)
      })

      it("it emits a 'Minted' event", async () => {
        expectEvent(this.receipt, 'Minted', { member, amount })
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.mint(member, amount, { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# burn', () => {
    const balance = new BN('350')
    const amount = new BN('200')

    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
      this.share = await RobinHoodShare.at(await this.coop.share())
    })

    beforeEach('!! mint', async () => {
      await this.coop.mint(member, balance, { from: root })
    })

    context('» msg.sender is an admin', () => {
      beforeEach('!! burn', async () => {
        this.receipt = await this.coop.burn(member, amount, { from: root })
      })

      it('it burns share', async () => {
        expect(await this.share.balanceOf(member)).to.be.bignumber.equal(balance.sub(amount))
      })

      it("it emits a 'Burnt' event", async () => {
        expectEvent(this.receipt, 'Burnt', { member, amount })
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.burn(member, amount, { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# pause', () => {
    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
      this.share = await RobinHoodShare.at(await this.coop.share())
    })

    beforeEach('!! unpause', async () => {
      await this.coop.unpause({ from: root })
    })

    context('» msg.sender is an admin', () => {
      beforeEach('!! pause', async () => {
        this.receipt = await this.coop.pause({ from: root })
      })

      it('it pauses share transfers', async () => {
        expect(await this.share.isPaused()).to.equal(true)
      })

      it("it emits a 'Paused' event", async () => {
        expectEvent(this.receipt, 'Paused')
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.pause({ from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# unpause', () => {
    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
      this.share = await RobinHoodShare.at(await this.coop.share())
    })

    context('» msg.sender is an admin', () => {
      beforeEach('!! unpause', async () => {
        this.receipt = await this.coop.unpause({ from: root })
      })

      it('it unpauses share transfers', async () => {
        expect(await this.share.isPaused()).to.equal(false)
      })

      it("it emits a 'Unpaused' event", async () => {
        expectEvent(this.receipt, 'Unpaused')
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.unpause({ from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# isMember', () => {
    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
      this.share = await RobinHoodShare.at(await this.coop.share())
    })

    beforeEach('!! mint', async () => {
      await this.coop.mint(member, new BN('200'), { from: root })
    })

    context('» address holds shares', () => {
      it('it returns true', async () => {
        expect(await this.coop.isMember(member)).to.equal(true)
      })
    })

    context('» address does not hold shares', () => {
      it('it returns false', async () => {
        expect(await this.coop.isMember(admin)).to.equal(false)
      })
    })
  })
})
