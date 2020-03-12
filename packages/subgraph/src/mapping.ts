import { Bytes, store } from '@graphprotocol/graph-ts'
import { Transfer } from '../generated/RobinHoodShare/RobinHoodShare'
import { CreatedMember } from '../generated/RobinHoodCoop/RobinHoodCoop'
import { Member } from '../generated/schema'
import { GENESIS_ADDRESS, ZERO, toDecimal } from './helpers'

function _member(address: Bytes): Member {
  let id = address.toHexString()
  let member = Member.load(id)

  if (member == null) {
    member = new Member(id)
    member.address = address
    member.firstname = ''
    member.lastname = ''
    member.email = ''
    member.shares = ZERO.toBigDecimal()
  }

  return member as Member
}

export function handleCreatedMember(event: CreatedMember): void {
  let member = _member(event.params.member)

  member.firstname = event.params.firstname
  member.lastname = event.params.lastname
  member.email = event.params.email

  member.save()
}

export function handleUpdatedMember(event: CreatedMember): void {
  let member = _member(event.params.member)

  member.firstname = event.params.firstname
  member.lastname = event.params.lastname
  member.email = event.params.email

  member.save()
}

export function handleDeletedMember(event: CreatedMember): void {
  store.remove('Member', event.params.member.toHex())
}

export function handleTransfer(event: Transfer): void {
  if (event.params.from.toHex() != GENESIS_ADDRESS) {
    let from: Member = _member(event.params.from)
    from.shares = from.shares.minus(toDecimal(event.params.value))
    from.save()
  }

  if (event.params.to.toHex() != GENESIS_ADDRESS) {
    let to: Member = _member(event.params.to)
    to.shares = to.shares.plus(toDecimal(event.params.value))
    to.save()
  }
}
