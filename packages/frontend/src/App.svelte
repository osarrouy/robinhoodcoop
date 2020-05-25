<script>
  import Home from '/routes/Home.svelte'
  import NotFound from '/routes/NotFound.svelte'
  import AdminError from '/routes/admin/Error.svelte'
  import { MembersCreate, MembersEdit, MembersList } from '/routes/admin/members/index.js'
  import { AdminsCreate, AdminsList } from '/routes/admin/admins/index.js'
  import { Shares } from '/routes/admin/shares/index.js'
  import { Burger, Nav } from '/sections/admin/index.js'
  import { RHC } from '/lib/index.js'
  import { onMount } from 'svelte'
  import Notifications from 'svelte-notifications'
  import { Router, Route } from 'yrv'
  import Modal from 'svelte-simple-modal';

  let metamask = false
  let network = null
  let account = null
  let isAdmin = false
  let coop = RHC.new()

  $: {
    if (!metamask || network !== '42') {
      isAdmin = false
    } else {
      coop.isAdmin(account).then(_isAdmin => {
        isAdmin = _isAdmin
      })
    }
  }

  onMount(async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        account = (await window.ethereum.enable())[0]
        network = window.ethereum.networkVersion
        metamask = true

        window.ethereum.on('accountsChanged', accounts => {
          account = accounts[0]
        })

        window.ethereum.on('networkChanged', chain => {
          network = chain
        })
      }
    } catch (e) {
      console.log(e.message)
    }
  })
</script>

<style lang="scss" global>
  @import 'src/styles/global.scss';
</style>

<Notifications>
  <Modal>
  <Router let:router>
    <Route exact component={Home} />
    {#if isAdmin}
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
      <Route exact path="/admin/members/edit/:address" let:router>
        <Nav />
        <Burger />
        <MembersEdit {router} />
      </Route>
      <Route exact path="/admin/shares">
        <Nav />
        <Burger />
        <Shares />
      </Route>
      <Route exact path="/admin/admins">
        <Nav />
        <Burger />
        <AdminsList account={account}/>
      </Route>
      <Route exact path="/admin/admins/create">
        <Nav />
        <Burger />
        <AdminsCreate />
      </Route>
    {:else}
      <Route exact path="/admin">
        <AdminError {metamask} {network} {isAdmin} />
      </Route>
    {/if}
    <Route fallback component={NotFound} />
  </Router>
  </Modal>
</Notifications>
