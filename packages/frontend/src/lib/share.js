import ABI    from '/lib/RobinHoodShare.js'
import ethers from 'ethers'

const ADDRESS = '0x0dc3B1B84Ca64d06cD453C2257fa86714C024574'

export const RHS = {
  new: () => {
    const provider = typeof window.ethereum !== 'undefined' && window.ethereum.networkVersion === '42' ? new ethers.providers.Web3Provider(web3.currentProvider) : ethers.getDefaultProvider('kovan')
    const share = typeof window.ethereum !== 'undefined' && window.ethereum.networkVersion === '42' ? new ethers.Contract(ADDRESS, ABI, provider.getSigner()) : new ethers.Contract(ADDRESS, ABI, provider)
    return share
  },
}
