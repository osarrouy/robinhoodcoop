import ABI    from '/lib/RobinHoodShare.js'
import ethers from 'ethers'

const ADDRESS = '0xaB9382C0aD4BD6c4Efd578f54b0DA1804F766e60'

export const RHS = {
  new: (opts = { metamask: false }) => {
    if (opts.metamask) {
      const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      const share    = new ethers.Contract(ADDRESS, ABI, provider.getSigner())
      return share
    } else {
      const provider = ethers.getDefaultProvider('mainnet')
      const share    = new ethers.Contract(ADDRESS, ABI, provider)
      return share
    }
  },
}
