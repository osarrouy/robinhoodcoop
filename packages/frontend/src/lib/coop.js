import ABI from '/lib/RobinHoodCoop.js'
import ethers from 'ethers'

const ADDRESS = '0x2cee3f3c8b09d8e75137936cfb9fb8f21f3654df'

export const coop = () => {
  const provider = new ethers.providers.Web3Provider(web3.currentProvider)
  const signer = provider.getSigner()

  return new ethers.Contract(ADDRESS, ABI, signer)
}

export const RHC = {
  new: () => {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider)
    const signer = provider.getSigner()

    return new ethers.Contract(ADDRESS, ABI, signer)
  },
}
