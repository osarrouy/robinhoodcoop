<script>
  import Notifications from 'svelte-notifications'

  import { onMount } from 'svelte'
  import { Router, Route } from 'yrv'
  import Admin from '/routes/admin/Home.svelte'
  import Home from '/routes/Home.svelte'

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
    <Route exact path="/" component={Home} />
  </Router>

  <Router path="/admin">
    <Route component={Admin} />
  </Router>
</Notifications>
