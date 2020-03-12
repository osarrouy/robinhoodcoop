const RobinHoodCoop = require('../build/contracts/RobinHoodCoop.json')
const RobinHoodShare = require('../build/contracts/RobinHoodShare.json')
const fs = require('fs')

const main = async () => {
  fs.writeFileSync('./abis/RobinHoodCoop.json', JSON.stringify(RobinHoodCoop.abi))
  fs.writeFileSync('./abis/RobinHoodShare.json', JSON.stringify(RobinHoodShare.abi))
}

try {
  main()
} catch (e) {
  console.error(e)
}
