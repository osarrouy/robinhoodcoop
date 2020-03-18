import ABI from '/lib/RobinHoodShare.js'
import ethers from 'ethers'

const ADDRESS = '0x5A09A48a3c5648930604F7ea6248470b44d3b45A'

export const RHS = {
  new: () => {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider)
    const signer = provider.getSigner()

    return new ethers.Contract(ADDRESS, ABI, signer)
  },
}
