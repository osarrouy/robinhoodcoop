import ABI    from '/lib/RobinHoodShare.js'
import ethers from 'ethers'

const ADDRESS = '0x0dc3B1B84Ca64d06cD453C2257fa86714C024574'

export const RHS = {
  new: (opts = { metamask: false }) => {
    if (opts.metamask) {
      const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      const share    = new ethers.Contract(ADDRESS, ABI, provider.getSigner())
      return share
    } else {
      const provider = ethers.getDefaultProvider('kovan')
      const share    = new ethers.Contract(ADDRESS, ABI, provider)
      return share
    }
  },
}
