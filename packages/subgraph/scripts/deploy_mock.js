const fs             = require('fs')
const yaml           = require('js-yaml')
const RobinHoodCoop  = artifacts.require('RobinHoodCoop')
const RobinHoodShare = artifacts.require('RobinHoodShare')

const toDecimals = balance => {
  return balance.div(web3.utils.toBN('1000000000000000000'))
}

const toWei = amount => {
  amount = web3.utils.toBN(amount)
  return amount.mul(web3.utils.toBN('1000000000000000000'))
}

module.exports = async cb => {
  try {
    const [root, admin_1, admin_2, admin_3, member_1, member_2, member_3] = await web3.eth.getAccounts()
    // deploy and initialize contracts
    const coop = await RobinHoodCoop.new()
    await coop.initialize()
    const share = await RobinHoodShare.at(await coop.share())
    // admins indexation //
    // grant admins
    await coop.grantAdmin(admin_1)
    await coop.grantAdmin(admin_2)
    await coop.grantAdmin(admin_3)
    // revokes admins
    await coop.revokeAdmin(admin_1)
    // shares / members indexation //
    // mint shares
    await coop.mint(member_1, toWei('1000'))
    await coop.mint(member_2, toWei('750'))
    await coop.mint(member_3, toWei('350'))
    // burn shares
    await coop.burn(member_2, toWei('750'))
    // transfer shares
    await coop.unpause()
    await share.transfer(member_3, toWei(150), { from: member_1 })
    // update subgraph.yaml //
    const file = fs.readFileSync('./subgraph.yaml', 'utf8')
    const data = yaml.safeLoad(file)
    data.dataSources[0].source.address = coop.address
    data.dataSources[1].source.address = share.address
    fs.writeFileSync('./subgraph.yaml', yaml.safeDump(data), 'utf8')
    // log data //
    console.log('RobinHoodCoop: '  + coop.address)
    console.log('RobinHoodShare: ' + share.address)
    console.log('=======================')
    console.log('Admins')
    console.log(root)
    console.log(admin_2)
    console.log(admin_3)
    console.log('=======================')
    console.log('Members')
    console.log(member_1 + ' | ' + toDecimals(await share.balanceOf(member_1)))
    console.log(member_3 + ' | ' + toDecimals(await share.balanceOf(member_3)))
  } catch (e) {
    console.log(e)
  }

  cb()
}
