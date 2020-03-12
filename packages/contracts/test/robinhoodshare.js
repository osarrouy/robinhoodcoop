const Share = artifacts.require('RobinHoodShare')
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers')
const { expect } = require('chai')
const { ZERO_ADDRESS } = constants

contract('RobinHoodShare', ([root, member_1, member_2, spender]) => {
  const supply = new BN(25000)

  beforeEach(async () => {
    this.share = await Share.new({ from: root })
    await this.share.mint(member_1, supply)
  })

  context('# constructor', () => {
    it('it initializes token details', async () => {
      expect(await this.share.name()).to.equal('RobinHoodShare')
      expect(await this.share.symbol()).to.equal('RHS')
      expect(await this.share.decimals()).to.be.bignumber.equal(new BN('18'))
    })

    it('it initializes controller', async () => {
      expect(await this.share.controller()).to.equal(root)
    })

    it('it pauses transfers', async () => {
      expect(await this.share.isPaused()).to.equal(true)
    })
  })

  context('# totalSupply', () => {
    it('it returns the total amount of token', async () => {
      expect(await this.share.totalSupply()).to.be.bignumber.equal(supply)
    })
  })

  context('# balanceOf', () => {
    context('» requested account has no tokens', () => {
      it('it returns zero', async () => {
        expect(await this.share.balanceOf(member_2)).to.be.bignumber.equal('0')
      })
    })

    context('» requested account has some tokens', () => {
      it('it returns the balance of the requested account', async () => {
        expect(await this.share.balanceOf(member_1)).to.be.bignumber.equal(supply)
      })
    })
  })

  context('# approve', () => {
    context('» spender is not the zero address', () => {
      context('» spender has enough balance', () => {
        const allowance = supply.sub(new BN('1'))

        context('» there was no approved amount before', () => {
          beforeEach('!! approve', async () => {
            this.receipt = await this.share.approve(spender, allowance, { from: member_1 })
          })

          it('it approves the requested amount', async () => {
            expect(await this.share.allowance(member_1, spender)).to.be.bignumber.equal(allowance)
          })

          it("it emits an 'Approval' event", async () => {
            expectEvent(this.receipt, 'Approval', { owner: member_1, spender, value: allowance })
          })
        })

        context('» there was an approved amount before', () => {
          const firstAllowance = supply.add(new BN('1'))

          beforeEach('!! first approve', async () => {
            this.receipt = await this.share.approve(spender, firstAllowance, { from: member_1 })
          })

          beforeEach('!! approve', async () => {
            this.receipt = await this.share.approve(spender, allowance, { from: member_1 })
          })

          it('it approves the requested amount', async () => {
            expect(await this.share.allowance(member_1, spender)).to.be.bignumber.equal(allowance)
          })

          it("it emits an 'Approval' event", async () => {
            expectEvent(this.receipt, 'Approval', { owner: member_1, spender, value: allowance })
          })
        })
      })

      context('» spender does not have enough balance', () => {
        const allowance = supply.add(new BN('1'))

        context('» there was no approved amount before', () => {
          beforeEach('!! approve', async () => {
            this.receipt = await this.share.approve(spender, allowance, { from: member_1 })
          })

          it('it approves the requested amount', async () => {
            expect(await this.share.allowance(member_1, spender)).to.be.bignumber.equal(allowance)
          })

          it("it emits an 'Approval' event", async () => {
            expectEvent(this.receipt, 'Approval', { owner: member_1, spender, value: allowance })
          })
        })

        context('» there was an approved amount before', () => {
          const firstAllowance = supply.add(new BN('1'))

          beforeEach('!! first approve', async () => {
            this.receipt = await this.share.approve(spender, firstAllowance, { from: member_1 })
          })

          beforeEach('!! approve', async () => {
            this.receipt = await this.share.approve(spender, allowance, { from: member_1 })
          })

          it('it approves the requested amount', async () => {
            expect(await this.share.allowance(member_1, spender)).to.be.bignumber.equal(allowance)
          })

          it("it emits an 'Approval' event", async () => {
            expectEvent(this.receipt, 'Approval', { owner: member_1, spender, value: allowance })
          })
        })
      })
    })

    context('» spender is the zero address', () => {
      it('reverts', async () => {
        await expectRevert(this.share.approve(ZERO_ADDRESS, supply, { from: member_1 }), 'ERC20: approve to the zero address')
      })
    })
  })

  context('# transfer', () => {
    context('» ether transfered', () => {
      it('it reverts', async () => {
        await expectRevert.unspecified(web3.eth.sendTransaction({ from: root, to: this.share.address, value: 10 }))
      })
    })

    context('» transfers are not paused', () => {
      beforeEach('!! unpause transfers', async () => {
        await this.share.unpause({ from: root })
      })

      context('» recipient is not the zero address', () => {
        context('» sender has enough balance', () => {
          context('» sender transfers all balance', () => {
            const amount = supply

            beforeEach('!! transfer all balance', async () => {
              this.receipt = await this.share.transfer(member_2, amount, { from: member_1 })
            })

            it('it transfers the requested amount', async () => {
              expect(await this.share.balanceOf(member_1)).to.be.bignumber.equal('0')
              expect(await this.share.balanceOf(member_2)).to.be.bignumber.equal(amount)
            })

            it("it emits a 'Transfer' event", async () => {
              expectEvent(this.receipt, 'Transfer', { from: member_1, to: member_2, value: amount })
            })
          })

          context('» sender transfers zero token', () => {
            const amount = new BN(0)

            beforeEach('!! transfer zero', async () => {
              this.receipt = await this.share.transfer(member_2, amount, { from: member_1 })
            })

            it('it transfers the requested amount', async () => {
              expect(await this.share.balanceOf(member_1)).to.be.bignumber.equal(supply)
              expect(await this.share.balanceOf(member_2)).to.be.bignumber.equal('0')
            })

            it("it emits a 'Transfer' event", async () => {
              expectEvent(this.receipt, 'Transfer', { from: member_1, to: member_2, value: amount })
            })
          })
        })

        context('» sender does not have enough balance', () => {
          it('it reverts', async () => {
            await expectRevert(this.share.transfer(member_2, supply.add(new BN('1')), { from: member_1 }), 'ERC20: transfer amount exceeds balance')
          })
        })
      })

      context('» recipient is the zero address', () => {
        it('it reverts', async () => {
          await expectRevert(this.share.transfer(ZERO_ADDRESS, supply, { from: member_1 }), 'ERC20: transfer to the zero address')
        })
      })
    })

    context('» transfers are paused', () => {
      it('it reverts', async () => {
        await expectRevert(this.share.transfer(member_2, supply, { from: member_1 }), 'ERC20: token tranfer while paused')
      })
    })
  })

  context('# transferFrom', () => {
    context('» transfers are not paused', () => {
      beforeEach('!! unpause transfers', async () => {
        await this.share.unpause({ from: root })
      })

      context('» token owner is not the zero address', () => {
        context('» recipient is not the zero address', () => {
          context('» spender has enough allowance', () => {
            const allowance = supply.add(new BN(1))

            beforeEach('!! approve spender', async () => {
              await this.share.approve(spender, allowance, { from: member_1 })
            })

            context('» token owner has enough balance', () => {
              const amount = supply

              beforeEach('!! transfer all balance from member1 to member2 through spender', async () => {
                this.receipt = await this.share.transferFrom(member_1, member_2, amount, { from: spender })
              })

              it('it transfers the requested amount', async () => {
                expect(await this.share.balanceOf(member_1)).to.be.bignumber.equal('0')
                expect(await this.share.balanceOf(member_2)).to.be.bignumber.equal(amount)
              })

              it('it decreases the spender allowance', async () => {
                expect(await this.share.allowance(member_1, spender)).to.be.bignumber.equal(allowance.sub(amount))
              })

              it("it emits a 'Transfer' event", async () => {
                expectEvent(this.receipt, 'Transfer', { from: member_1, to: member_2, value: amount })
              })

              it("it emits an 'Approval' event", async () => {
                expectEvent(this.receipt, 'Approval', { owner: member_1, spender, value: allowance.sub(amount) })
              })
            })

            context('» token owner does not have enough balance', () => {
              it('it reverts', async () => {
                await expectRevert(this.share.transferFrom(member_1, member_2, allowance, { from: spender }), 'ERC20: transfer amount exceeds balance')
              })
            })
          })

          context('» spender does not have enough allowance', () => {
            const allowance = supply.sub(new BN(1))

            beforeEach('!! approve spender', async () => {
              await this.share.approve(spender, allowance, { from: member_1 })
            })

            context('» token owner has enough balance', () => {
              it('it reverts', async () => {
                await expectRevert(this.share.transferFrom(member_1, member_2, supply, { from: spender }), 'ERC20: transfer amount exceeds allowance')
              })
            })

            context('» token owner does not have enough balance', () => {
              it('it reverts', async () => {
                await expectRevert(
                  this.share.transferFrom(member_1, member_2, supply.add(new BN(1)), { from: spender }),
                  'ERC20: transfer amount exceeds balance'
                )
              })
            })
          })
        })

        context('» recipient is the zero address', () => {
          const allowance = supply.add(new BN(1))

          beforeEach('!! approve spender', async () => {
            await this.share.approve(spender, allowance, { from: member_1 })
          })

          it('it reverts', async () => {
            await expectRevert(this.share.transferFrom(member_1, ZERO_ADDRESS, supply, { from: spender }), 'ERC20: transfer to the zero address')
          })
        })
      })

      context('» token owner is the zero address', () => {
        it('it reverts', async () => {
          await expectRevert(this.share.transferFrom(ZERO_ADDRESS, member_1, supply, { from: spender }), 'ERC20: transfer from the zero address')
        })
      })
    })

    context('» transfers are paused', () => {
      const allowance = supply

      beforeEach('!! approve spender', async () => {
        await this.share.approve(spender, allowance, { from: member_1 })
      })
      it('it reverts', async () => {
        await expectRevert(this.share.transferFrom(member_1, member_2, supply, { from: spender }), 'ERC20: token tranfer while paused')
      })
    })
  })

  context('# updateController', () => {
    context('» msg.sender is controller', () => {
      beforeEach('!! update controller', async () => {
        this.receipt = await this.share.updateController(member_1, { from: root })
      })

      it('it updates controller', async () => {
        expect(await this.share.controller()).to.equal(member_1)
      })

      it("it emits a 'UpdatedController' event", async () => {
        expectEvent(this.receipt, 'UpdatedController', { controller: member_1 })
      })
    })

    context('» msg.sender is not controller', () => {
      it('it reverts', async () => {
        await expectRevert(this.share.updateController(member_1, { from: member_2 }), 'ERC20: only controller can perform this operation')
      })
    })
  })

  context('# pause', () => {
    beforeEach('!! unpause', async () => {
      await this.share.unpause({ from: root })
    })

    context('» msg.sender is controller', () => {
      context('» transfers are not already paused', () => {
        beforeEach('!! pause', async () => {
          this.receipt = await this.share.pause({ from: root })
        })

        it('it pauses transfers', async () => {
          expect(await this.share.isPaused()).to.equal(true)
        })

        it("it emits a 'Paused' event", async () => {
          expectEvent(this.receipt, 'Paused')
        })
      })

      context('» transfers are already paused', () => {
        beforeEach('!! pause', async () => {
          this.receipt = await this.share.pause({ from: root })
        })

        it('it reverts', async () => {
          await expectRevert(this.share.pause({ from: root }), 'ERC20: transfers already paused')
        })
      })
    })

    context('» msg.sender is not controller', () => {
      it('it reverts', async () => {
        await expectRevert(this.share.pause({ from: member_1 }), 'ERC20: only controller can perform this operation')
      })
    })
  })

  context('# unpause', () => {
    context('» msg.sender is controller', () => {
      context('» transfers are paused', () => {
        beforeEach('!! unpause', async () => {
          this.receipt = await this.share.unpause({ from: root })
        })

        it('it unpauses transfers', async () => {
          expect(await this.share.isPaused()).to.equal(false)
        })

        it("it emits a 'Unpaused' event", async () => {
          expectEvent(this.receipt, 'Unpaused')
        })
      })

      context('» transfers are not paused', () => {
        beforeEach('!! unpause', async () => {
          this.receipt = await this.share.unpause({ from: root })
        })

        it('it reverts', async () => {
          await expectRevert(this.share.unpause({ from: root }), 'ERC20: transfers already unpaused')
        })
      })
    })

    context('» msg.sender is not controller', () => {
      it('it reverts', async () => {
        await expectRevert(this.share.unpause({ from: member_1 }), 'ERC20: only controller can perform this operation')
      })
    })
  })

  // // APPROVALS
  // it('approvals: msg.sender should approve 100 to accounts[1]', async () => {
  //   await this.share.approve(accounts[1], 100, { from: accounts[0] })
  //   const allowance = await this.share.allowance.call(accounts[0], accounts[1])
  //   assert.strictEqual(allowance.toNumber(), 100)
  // })

  // // bit overkill. But is for testing a bug
  // it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 once.', async () => {
  //   const balance0 = await this.share.balanceOf.call(accounts[0])
  //   assert.strictEqual(balance0.toNumber(), 10000)

  //   await this.share.approve(accounts[1], 100, { from: accounts[0] }) // 100
  //   const balance2 = await this.share.balanceOf.call(accounts[2])
  //   assert.strictEqual(balance2.toNumber(), 0, 'balance2 not correct')

  //   await this.share.transferFrom.call(accounts[0], accounts[2], 20, { from: accounts[1] })
  //   await this.share.allowance.call(accounts[0], accounts[1])
  //   await this.share.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] }) // -20
  //   const allowance01 = await this.share.allowance.call(accounts[0], accounts[1])
  //   assert.strictEqual(allowance01.toNumber(), 80) // =80

  //   const balance22 = await this.share.balanceOf.call(accounts[2])
  //   assert.strictEqual(balance22.toNumber(), 20)

  //   const balance02 = await this.share.balanceOf.call(accounts[0])
  //   assert.strictEqual(balance02.toNumber(), 9980)
  // })

  // // should approve 100 of msg.sender & withdraw 50, twice. (should succeed)
  // it('approvals: msg.sender approves accounts[1] of 100 & withdraws 20 twice.', async () => {
  //   await this.share.approve(accounts[1], 100, { from: accounts[0] })
  //   const allowance01 = await this.share.allowance.call(accounts[0], accounts[1])
  //   assert.strictEqual(allowance01.toNumber(), 100)

  //   await this.share.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] })
  //   const allowance012 = await this.share.allowance.call(accounts[0], accounts[1])
  //   assert.strictEqual(allowance012.toNumber(), 80)

  //   const balance2 = await this.share.balanceOf.call(accounts[2])
  //   assert.strictEqual(balance2.toNumber(), 20)

  //   const balance0 = await this.share.balanceOf.call(accounts[0])
  //   assert.strictEqual(balance0.toNumber(), 9980)

  //   // FIRST tx done.
  //   // onto next.
  //   await this.share.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] })
  //   const allowance013 = await this.share.allowance.call(accounts[0], accounts[1])
  //   assert.strictEqual(allowance013.toNumber(), 60)

  //   const balance22 = await this.share.balanceOf.call(accounts[2])
  //   assert.strictEqual(balance22.toNumber(), 40)

  //   const balance02 = await this.share.balanceOf.call(accounts[0])
  //   assert.strictEqual(balance02.toNumber(), 9960)
  // })

  // // should approve 100 of msg.sender & withdraw 50 & 60 (should fail).
  // it('approvals: msg.sender approves accounts[1] of 100 & withdraws 50 & 60 (2nd tx should fail)', async () => {
  //   await this.share.approve(accounts[1], 100, { from: accounts[0] })
  //   const allowance01 = await this.share.allowance.call(accounts[0], accounts[1])
  //   assert.strictEqual(allowance01.toNumber(), 100)

  //   await this.share.transferFrom(accounts[0], accounts[2], 50, { from: accounts[1] })
  //   const allowance012 = await this.share.allowance.call(accounts[0], accounts[1])
  //   assert.strictEqual(allowance012.toNumber(), 50)

  //   const balance2 = await this.share.balanceOf.call(accounts[2])
  //   assert.strictEqual(balance2.toNumber(), 50)

  //   const balance0 = await this.share.balanceOf.call(accounts[0])
  //   assert.strictEqual(balance0.toNumber(), 9950)

  //   // FIRST tx done.
  //   // onto next.
  //   await expectRevert(this.share.transferFrom.call(accounts[0], accounts[2], 60, { from: accounts[1] }))
  // })

  // it('approvals: attempt withdrawal from account with no allowance (should fail)', async () => {
  //   await expectRevert(this.share.transferFrom.call(accounts[0], accounts[2], 60, { from: accounts[1] }))
  // })

  // it('approvals: allow accounts[1] 100 to withdraw from accounts[0]. Withdraw 60 and then approve 0 & attempt transfer.', async () => {
  //   await this.share.approve(accounts[1], 100, { from: accounts[0] })
  //   await this.share.transferFrom(accounts[0], accounts[2], 60, { from: accounts[1] })
  //   await this.share.approve(accounts[1], 0, { from: accounts[0] })
  //   await expectRevert(this.share.transferFrom.call(accounts[0], accounts[2], 10, { from: accounts[1] }))
  // })

  // it('approvals: approve max (2^256 - 1)', async () => {
  //   await this.share.approve(accounts[1], '115792089237316195423570985008687907853269984665640564039457584007913129639935', { from: accounts[0] })
  //   const allowance = await this.share.allowance(accounts[0], accounts[1])
  //   assert(allowance.equals('1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77'))
  // })

  // // should approve max of msg.sender & withdraw 20 without changing allowance (should succeed).
  // it('approvals: msg.sender approves accounts[1] of max (2^256 - 1) & withdraws 20', async () => {
  //   const balance0 = await this.share.balanceOf.call(accounts[0])
  //   assert.strictEqual(balance0.toNumber(), 10000)

  //   const max = '1.15792089237316195423570985008687907853269984665640564039457584007913129639935e+77'
  //   await this.share.approve(accounts[1], max, { from: accounts[0] })
  //   const balance2 = await this.share.balanceOf.call(accounts[2])
  //   assert.strictEqual(balance2.toNumber(), 0, 'balance2 not correct')

  //   await this.share.transferFrom(accounts[0], accounts[2], 20, { from: accounts[1] })
  //   const allowance01 = await this.share.allowance.call(accounts[0], accounts[1])
  //   assert(allowance01.equals(max))

  //   const balance22 = await this.share.balanceOf.call(accounts[2])
  //   assert.strictEqual(balance22.toNumber(), 20)

  //   const balance02 = await this.share.balanceOf.call(accounts[0])
  //   assert.strictEqual(balance02.toNumber(), 9980)
  // })

  // /* eslint-disable no-underscore-dangle */
  // it('events: should fire Transfer event properly', async () => {
  //   const res = await this.share.transfer(accounts[1], '2666', { from: accounts[0] })
  //   const transferLog = res.logs.find(element => element.event.match('Transfer'))
  //   assert.strictEqual(transferLog.args._from, accounts[0])
  //   assert.strictEqual(transferLog.args._to, accounts[1])
  //   assert.strictEqual(transferLog.args._value.toString(), '2666')
  // })

  // it('events: should fire Transfer event normally on a zero transfer', async () => {
  //   const res = await this.share.transfer(accounts[1], '0', { from: accounts[0] })
  //   const transferLog = res.logs.find(element => element.event.match('Transfer'))
  //   assert.strictEqual(transferLog.args._from, accounts[0])
  //   assert.strictEqual(transferLog.args._to, accounts[1])
  //   assert.strictEqual(transferLog.args._value.toString(), '0')
  // })

  // it('events: should fire Approval event properly', async () => {
  //   const res = await this.share.approve(accounts[1], '2666', { from: accounts[0] })
  //   const approvalLog = res.logs.find(element => element.event.match('Approval'))
  //   assert.strictEqual(approvalLog.args._owner, accounts[0])
  //   assert.strictEqual(approvalLog.args._spender, accounts[1])
  //   assert.strictEqual(approvalLog.args._value.toString(), '2666')
  // })
})
