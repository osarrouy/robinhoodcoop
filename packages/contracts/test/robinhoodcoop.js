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
          await expectRevert(this.coop.revokeAdmin(admin, { from: admin }), 'ADMIN_CANNOT_REVOKE_ITSELF')
        })
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.revokeAdmin(admin, { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# createMemberWithShare', () => {
    const amount = new BN('275')

    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
      this.share = await RobinHoodShare.at(await this.coop.share())
    })

    context('» msg.sender is an admin', () => {
      beforeEach('!! create member', async () => {
        this.receipt = await this.coop.createMemberWithShares(member, 'Jane', 'Doe', 'jane@doe.com', amount, { from: root })
      })

      context('» created member is not already a member', () => {
        it('it creates member', async () => {
          const data = await this.coop.member(member)

          expect(data.exists).to.equal(true)
          expect(data.firstname).to.equal('Jane')
          expect(data.lastname).to.equal('Doe')
          expect(data.email).to.equal('jane@doe.com')
        })

        it('it mints shares', async () => {
          expect(await this.share.balanceOf(member)).to.be.bignumber.equal(amount)
        })

        it("it emits an 'CreatedMember' event", async () => {
          expectEvent(this.receipt, 'CreatedMember', { member, firstname: 'Jane', lastname: 'Doe', email: 'jane@doe.com' })
        })

        it("it emits an 'Minted' event", async () => {
          expectEvent(this.receipt, 'Minted', { member, amount })
        })
      })

      context('» created member is already a member', () => {
        it('it reverts', async () => {
          await expectRevert(this.coop.createMemberWithShares(member, 'Jane', 'Doe', 'jane@doe.com', amount, { from: root }), 'ALREADY_A_MEMBER')
        })
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.createMemberWithShares(member, 'Jane', 'Doe', 'jane@doe.com', amount, { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# createMember', () => {
    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
    })

    context('» msg.sender is an admin', () => {
      beforeEach('!! create member', async () => {
        this.receipt = await this.coop.createMember(member, 'Jane', 'Doe', 'jane@doe.com', { from: root })
      })

      context('» created member is not already a member', () => {
        it('it creates member', async () => {
          const data = await this.coop.member(member)

          expect(data.exists).to.equal(true)
          expect(data.firstname).to.equal('Jane')
          expect(data.lastname).to.equal('Doe')
          expect(data.email).to.equal('jane@doe.com')
        })

        it("it emits an 'CreatedMember' event", async () => {
          expectEvent(this.receipt, 'CreatedMember', { member, firstname: 'Jane', lastname: 'Doe', email: 'jane@doe.com' })
        })
      })

      context('» created member is already a member', () => {
        it('it reverts', async () => {
          await expectRevert(this.coop.createMember(member, 'Jane', 'Doe', 'jane@doe.com', { from: root }), 'ALREADY_A_MEMBER')
        })
      })
    })

    context('» msg.sender is not an admin', () => {
      it('it reverts', async () => {
        await expectRevert(this.coop.createMember(member, 'Jane', 'Doe', 'jane@doe.com', { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# updateMember', () => {
    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
    })

    context('» msg.sender is an admin', () => {
      context('» updated member is a member', () => {
        beforeEach('!! create member', async () => {
          await this.coop.createMember(member, 'Jane', 'Doe', 'jane@doe.com', { from: root })
        })

        beforeEach('!! update member', async () => {
          this.receipt = await this.coop.updateMember(member, 'Joe', 'Dawn', 'joe@dawn.com', { from: root })
        })

        it('it updates member', async () => {
          const data = await this.coop.member(member)

          expect(data.exists).to.equal(true)
          expect(data.firstname).to.equal('Joe')
          expect(data.lastname).to.equal('Dawn')
          expect(data.email).to.equal('joe@dawn.com')
        })

        it("it emits an 'UpdatedMember' event", async () => {
          expectEvent(this.receipt, 'UpdatedMember', { member, firstname: 'Joe', lastname: 'Dawn', email: 'joe@dawn.com' })
        })
      })

      context('» updated member is not a member', () => {
        it('it reverts', async () => {
          await expectRevert(this.coop.updateMember(member, 'Joe', 'Dawn', 'joe@dawn.com', { from: root }), 'NOT_A_MEMBER')
        })
      })
    })

    context('» msg.sender is not an admin', () => {
      beforeEach('!! create member', async () => {
        await this.coop.createMember(member, 'Jane', 'Doe', 'jane@doe.com', { from: root })
      })

      it('it reverts', async () => {
        await expectRevert(this.coop.updateMember(member, 'Joe', 'Dawn', 'joe@dawn.com', { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# deleteMember', () => {
    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
    })

    context('» msg.sender is an admin', () => {
      context('» deleted member is a member', () => {
        beforeEach('!! create member', async () => {
          await this.coop.createMember(member, 'Jane', 'Doe', 'jane@doe.com', { from: root })
        })

        beforeEach('!! delete member', async () => {
          this.receipt = await this.coop.deleteMember(member, { from: root })
        })

        it('it deletes member', async () => {
          const data = await this.coop.member(member)

          expect(data.exists).to.equal(false)
          expect(data.firstname).to.equal('')
          expect(data.lastname).to.equal('')
          expect(data.email).to.equal('')
        })

        it("it emits an 'DeletedMember' event", async () => {
          expectEvent(this.receipt, 'DeletedMember', { member })
        })
      })

      context('» deleted member is not a member', () => {
        it('it reverts', async () => {
          await expectRevert(this.coop.deleteMember(member, { from: root }), 'NOT_A_MEMBER')
        })
      })
    })

    context('» msg.sender is not an admin', () => {
      beforeEach('!! create member', async () => {
        await this.coop.createMember(member, 'Jane', 'Doe', 'jane@doe.com', { from: root })
      })

      it('it reverts', async () => {
        await expectRevert(this.coop.deleteMember(member, { from: member }), 'ADMIN_ONLY_OPERATION')
      })
    })
  })

  context('# mint', () => {
    const amount = new BN('350')

    beforeEach('!! initialize RobinHoodCoop', async () => {
      await this.coop.initialize({ from: root })
      this.share = await RobinHoodShare.at(await this.coop.share())
    })

    beforeEach('!! create member', async () => {
      await this.coop.createMember(member, 'Jane', 'Doe', 'jane@doe.com', { from: root })
    })

    context('» msg.sender is an admin', () => {
      context('» recipient is a member', () => {
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

      context('» recipient is not a member', () => {
        it('it reverts', async () => {
          await expectRevert(this.coop.mint(admin, amount, { from: root }), 'NOT_A_MEMBER')
        })
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

    beforeEach('!! create member', async () => {
      await this.coop.createMember(member, 'Jane', 'Doe', 'jane@doe.com', { from: root })
    })

    beforeEach('!! mint', async () => {
      await this.coop.mint(member, balance, { from: root })
    })

    context('» msg.sender is an admin', () => {
      context('» recipient is a member', () => {
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

      context('» recipient is not a member', () => {
        it('it reverts', async () => {
          await expectRevert(this.coop.burn(admin, amount, { from: root }), 'NOT_A_MEMBER')
        })
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
})
