const RobinHoodCoop = artifacts.require('RobinHoodCoop')
const RobinHoodShare = artifacts.require('RobinHoodShare')
const fs = require('fs')
const yaml = require('js-yaml')

const toDecimal = balance => {
  return balance.div(web3.utils.toBN('1000000000000000000'))
}

const toWei = amount => {
  amount = web3.utils.toBN(amount)
  return amount.mul(web3.utils.toBN('1000000000000000000'))
}

module.exports = async cb => {
  try {
    const [root, member_1, member_2, member_3] = await web3.eth.getAccounts()

    const coop = await RobinHoodCoop.new()
    await coop.initialize()
    const share = await RobinHoodShare.at(await coop.share())

    await coop.createMemberWithShares(member_1, 'Jane', 'Doe', 'jane@doe.com', toWei('1000'))
    await coop.createMemberWithShares(member_2, 'Joe', 'Dawn', 'joe@dawn.com', toWei('750'))
    await coop.createMemberWithShares(member_3, 'Jack', 'Dack', 'jack@dack.com', toWei('350'))

    await coop.deleteMember(member_2)
    await coop.updateMember(member_3, 'Jackie', 'Dack', 'jackie@dack.com')

    await coop.unpause()
    await share.transfer(member_3, toWei(150), { from: member_1 })

    const file = fs.readFileSync('./subgraph.yaml', 'utf8')
    const data = yaml.safeLoad(file)

    data.dataSources[0].source.address = coop.address
    data.dataSources[1].source.address = share.address

    fs.writeFileSync('./subgraph.yaml', yaml.safeDump(data), 'utf8')

    console.log('RobinHoodCoop: ' + coop.address)
    console.log('RobinHoodShare: ' + share.address)
    console.log('=======================')
    console.log('Balance | ' + member_1 + ' | ' + toDecimal(await share.balanceOf(member_1)))
    console.log('Balance | ' + member_3 + ' | ' + toDecimal(await share.balanceOf(member_3)))
  } catch (e) {
    console.log(e)
  }

  cb()
}
