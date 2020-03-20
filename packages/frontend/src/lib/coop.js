import ABI from '/lib/RobinHoodCoop.js'
import ethers from 'ethers'

const ADDRESS = '0x2cee3f3c8b09d8e75137936cfb9fb8f21f3654df'

export const RHC = {
  new: () => {
    const provider = typeof window.ethereum !== 'undefined' ? new ethers.providers.Web3Provider(web3.currentProvider) : ethers.getDefaultProvider('kovan')
    const coop = typeof window.ethereum !== 'undefined' ? new ethers.Contract(ADDRESS, ABI, provider.getSigner()) : new ethers.Contract(ADDRESS, ABI, provider)
    return coop
  },
}
