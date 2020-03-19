import { RHC } from './coop.js'
import { member } from '/stores/member.js'
import { get } from 'svelte/store'

import Fortmatic from 'fortmatic'

const KEY = 'pk_live_466F6781B380D059'

export const fortmatic = new Fortmatic.Phantom(KEY)

export const Member = {
  login: async () => {
    if (await fortmatic.user.isLoggedIn()) {
      const metadata = await fortmatic.user.getMetadata()
      member.set({ address: metadata.publicAddress, email: metadata.email, account: fortmatic.user })
    } else {
      member.set(null)
    }
  },
  authenticate: async email => {
    await fortmatic.loginWithMagicLink({ email, showUI: false })
  },
  isMember: async () => {
    if (!get(member)) {
      return false
    } else {
      const coop = RHC.new()
      if (await coop.isMember(get(member).address)) {
        return true
      } else {
        return false
      }
    }
  },
  logout: async () => {
    fortmatic.user.logout()
    member.set(null)
  },
}
