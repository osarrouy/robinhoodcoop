import ABI from '/lib/RobinHoodCoop.js'
import ethers from 'ethers'

const ADDRESS = '0x2cee3f3c8b09d8e75137936cfb9fb8f21f3654df'

const provider = new ethers.providers.Web3Provider(web3.currentProvider)
const signer = provider.getSigner()

export const coop = new ethers.Contract(ADDRESS, ABI, signer)
