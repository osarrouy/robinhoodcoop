import ethers from 'ethers'

export const isAddress = address => {
  try {
    ethers.utils.getAddress(address)
  } catch (e) {
    return false
  }

  return true
}

export const shorten = address => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}
