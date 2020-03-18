<script>
  import Home from '/routes/Home.svelte'
  import { MembersCreate, MembersEdit, MembersList } from '/routes/admin/members/index.js'
  import { Shares } from '/routes/admin/shares/index.js'
  import { Burger, Nav } from '/sections/admin/index.js'
  import { RHC } from '/lib/index.js'
  import { onMount } from 'svelte'
  import Notifications from 'svelte-notifications'
  import { Router, Route } from 'yrv'
  import { admin } from '/stores/admin/admin'

  let ethereum = null
  let account = null
  let network = null
  let error = ''

  $: {
    if (!account) {
      error = 'Please unlock metamask'
    } else if (network !== '1') {
      error = 'Select the mainnet network'
    } else {
      // shorten = account.slice(0, 6) + '...' + account.slice(-4)
      error = ''
    }
  }

  onMount(async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        ethereum = window.ethereum
        $admin = (await ethereum.enable())[0]
        network = ethereum.networkVersion

        ethereum.on('accountsChanged', accounts => {
          account = accounts[0]
        })

        ethereum.on('networkChanged', chain => {
          network = chain
        })
      } else {
        error = 'No Metamask instance detected. Please install Metamask.'
      }
    } catch (e) {
      error = e
    }
  })
</script>

<style lang="scss" global>
  @import 'src/styles/global.scss';
</style>

<Notifications>
  <Router nofallback>
    <Route exact component={Home} />
    <Route exact path="/admin" redirect="/admin/members" />
    <Route exact path="/admin/members">
      <Nav />
      <Burger />
      <MembersList />
    </Route>
    <Route exact path="/admin/members/create">
      <Nav />
      <Burger />
      <MembersCreate />
    </Route>
    <Route exact path="/admin/members/edit/:address">
      <Nav />
      <Burger />
      <MembersEdit />
    </Route>
    <Route exact path="/admin/shares">
      <Nav />
      <Burger />
      <Shares />
    </Route>
    <Route fallback component={Home} />
  </Router>
</Notifications>
