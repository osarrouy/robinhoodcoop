<script>
  import { Animate, Button } from '/components/index.js'
  import { Burger, Nav } from '/sections/admin/index.js'
  import { MembersCreate, MembersEdit, MembersList } from '/routes/admin/members/index.js'
  import { Shares } from '/routes/admin/shares/index.js'
  import { RHC } from '/lib/index.js'
  import { onMount } from 'svelte'
  import { Router, Route, navigateTo } from 'yrv'

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
    } catch (e) {}

    if (isAdmin) {
      navigateTo('/admin/members')
    }
  })
</script>

<style type="text/scss">
  .wrapper {
    min-height: 100vh;
    width: 100vw;
  }

  .dispatch {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
  }
</style>

<div class="wrapper">

  <Router disabled={!isAdmin}>
    <Route fallback>Toto</Route>
    <Nav />
    <Burger />
    <Router path="/members">
      <Route exact component={MembersList} />
      <Route exact path="/create" component={MembersCreate} />
      <Route exact path="/edit/:address" component={MembersEdit} />
      <Route fallback component={MembersList} />
    </Router>
    <Router path="/shares">
      <Route exact component={Shares} />
      <Route fallback component={Shares} />
    </Router>
    <!-- <Router>
        <Animate>
          <div class="dispatch">
            <Button on:click={() => navigateTo('/admin/members')} class="space-right">browse members</Button>
            <Button on:click={() => navigateTo('/admin/admins')} class="space-right">browse admins</Button>
            <Button on:click={() => navigateTo('/admin/shares')}>edit shares</Button>
          </div>
        </Animate>
      </Route>
    </Router> -->
  </Router>
  <Router disabled={isAdmin}>
    <section class="error">
      {#if !metamask}
        <img src="/img/metamask.png" alt="Metamask" />
        <p>
          <a href="https://metamask.io" target="_blank">install</a>
          or enable Metamask
        </p>
      {:else if network !== '42'}
        <p>Your are connected to the wrong network. Please select the kovan network in Metamask.</p>
      {:else if !isAdmin}
        <p>Your are not identified as a RobinHoodCoop admin. Please pick up a different account in Metamask.</p>
      {/if}
    </section>
  </Router>
</div>
