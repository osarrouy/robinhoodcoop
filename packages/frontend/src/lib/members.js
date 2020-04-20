import ethers     from 'ethers'
import Fortmatic  from 'fortmatic'
import { RHC }    from './coop.js'
import { member } from '/stores/member.js'
import { get }    from 'svelte/store'

const KEY = 'pk_live_466F6781B380D059'

export const fortmatic = new Fortmatic(KEY)

export const Member = {
  relogin : async () => {
    if (await fortmatic.user.isLoggedIn()) {
      const provider = new ethers.providers.Web3Provider(fortmatic.getProvider())
      const accounts = await provider.listAccounts()
      const metadata = await fortmatic.user.getUser(); 
      const coop = RHC.new()
      if (await coop.isMember(accounts[0])) {
        member.set({ address: accounts[0], email: metadata.email, account: fortmatic.user })
        return true
      } else {
        Member.logout()
        return false
      }
    } else {
      return false
    }
  },
  login: async () => {
    if (!await Member.relogin()) {
      await fortmatic.user.login()
      const provider = new ethers.providers.Web3Provider(fortmatic.getProvider())
      const accounts = await provider.listAccounts()
      const metadata = await fortmatic.user.getUser(); 
      member.set({ address: accounts[0], email: metadata.email, account: fortmatic.user })
    }
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
