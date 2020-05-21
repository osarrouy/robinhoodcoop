import { Bytes, store }                             from '@graphprotocol/graph-ts'
import { Transfer }                                 from '../generated/RobinHoodShare/RobinHoodShare'
import { GrantedAdmin, RevokedAdmin, UpdatedValue } from '../generated/RobinHoodCoop/RobinHoodCoop'
import { Admin, Member, Share }                     from '../generated/schema'
import { GENESIS_ADDRESS, ZERO, toDecimals }        from './helpers'

function _member(address: Bytes): Member {
  let id     = address.toHexString()
  let member = Member.load(id)

  if (member == null) {
    member         = new Member(id)
    member.address = address
    member.shares  = ZERO
  }

  return member as Member
}

function _admin(address: Bytes): Admin {
  let id    = address.toHexString()
  let admin = Admin.load(id)

  if (admin == null) {
    admin         = new Admin(id)
    admin.address = address
  }

  return admin as Admin
}

function _share(): Share {
  let share = Share.load('0')

  if (share == null) {
    share = new Share('0')
  }

  return share as Share
}

export function handleGrantedAdmin(event: GrantedAdmin): void {
  let admin = _admin(event.params.admin)

  admin.save()
}

export function handleRevokedAdmin(event: RevokedAdmin): void {
  store.remove('Admin', event.params.admin.toHex())
}

export function handleUpdatedValue(event: UpdatedValue): void {
  let share = _share();

  share.value     = toDecimals(event.params.value)
  share.timestamp = event.block.timestamp

  share.save();
}

export function handleTransfer(event: Transfer): void {
  if (event.params.from.toHex() != GENESIS_ADDRESS) {
    let from: Member = _member(event.params.from)
    from.shares      = from.shares.minus(toDecimals(event.params.value))
    if (from.shares == ZERO) {
      store.remove('Member', event.params.from.toHex()) // delete members who don't hold shares anymore
    } else {
      from.save()
    }
  }

  if (event.params.to.toHex() != GENESIS_ADDRESS) {
    let to: Member = _member(event.params.to)
    to.shares      = to.shares.plus(toDecimals(event.params.value))
    to.save()
  }
}
