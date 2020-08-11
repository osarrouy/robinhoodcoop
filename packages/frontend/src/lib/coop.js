import ABI    from '/lib/RobinHoodCoop.js'
import ethers from 'ethers'

const ADDRESS = '0x1030e7bb1fB3a9EEE118C5cca4EBAfDAA3d350D1'

export const RHC = {
  new: (opts = { metamask: false }) => {
    if (opts.metamask) {
      const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      const coop     = new ethers.Contract(ADDRESS, ABI, provider.getSigner())
      return coop
    } else {
      const provider = ethers.getDefaultProvider('mainnet')
      const coop     = new ethers.Contract(ADDRESS, ABI, provider)
      return coop
    }
  },
}
