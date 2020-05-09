import ABI    from '/lib/RobinHoodCoop.js'
import ethers from 'ethers'

const ADDRESS = '0xdA08FcdD705750A6738445a6E9c2D76dAE6d8576'

export const RHC = {
  new: (opts = { metamask: false }) => {
    if (opts.metamask) {
      const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      const coop     = new ethers.Contract(ADDRESS, ABI, provider.getSigner())
      return coop
    } else {
      const provider = ethers.getDefaultProvider('kovan')
      const coop     = new ethers.Contract(ADDRESS, ABI, provider)
      return coop
    }
  },
}
