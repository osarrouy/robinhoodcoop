import ABI    from '/lib/RobinHoodCoop.js'
import ethers from 'ethers'

const ADDRESS = '0xdA08FcdD705750A6738445a6E9c2D76dAE6d8576'

export const RHC = {
  new: () => {
    const provider = typeof window.ethereum !== 'undefined' && window.ethereum.networkVersion === '42' ? new ethers.providers.Web3Provider(web3.currentProvider) : ethers.getDefaultProvider('kovan')
    const coop = typeof window.ethereum !== 'undefined' && window.ethereum.networkVersion === '42' ? new ethers.Contract(ADDRESS, ABI, provider.getSigner()) : new ethers.Contract(ADDRESS, ABI, provider)
    return coop
  },
}
