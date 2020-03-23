import ABI from '/lib/RobinHoodShare.js'
import ethers from 'ethers'

const ADDRESS = '0x5A09A48a3c5648930604F7ea6248470b44d3b45A'

export const RHS = {
  new: () => {
    const provider = typeof window.ethereum !== 'undefined' && window.ethereum.networkVersion === '42' ? new ethers.providers.Web3Provider(web3.currentProvider) : ethers.getDefaultProvider('kovan')
    const share = typeof window.ethereum !== 'undefined' && window.ethereum.networkVersion === '42' ? new ethers.Contract(ADDRESS, ABI, provider.getSigner()) : new ethers.Contract(ADDRESS, ABI, provider)
    return share
  },
}
