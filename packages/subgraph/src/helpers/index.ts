import { BigDecimal, BigInt } from '@graphprotocol/graph-ts'

export const GENESIS_ADDRESS = '0x0000000000000000000000000000000000000000'

export let ZERO = BigInt.fromI32(0)

export function toDecimal(value: BigInt): BigDecimal {
  let precision = BigInt.fromI32(10)
    .pow(<u8>18)
    .toBigDecimal()

  return value.divDecimal(precision)
}
