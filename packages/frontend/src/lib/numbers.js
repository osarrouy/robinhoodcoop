import BigNumber from 'bignumber.js'

const BASE = new BigNumber(10).pow(new BigNumber(18))

export const toDecimals = value => {
  return new BigNumber(value).dividedBy(BASE).toFixed(2)
}

export const toFormattedDecimals = value => {
  return new BigNumber(value).dividedBy(BASE).toFormat(2)
}

export const toFixed = value => {
  return new BigNumber(value)
    .multipliedBy(BASE)
    .toFixed()
    .toString()
}
