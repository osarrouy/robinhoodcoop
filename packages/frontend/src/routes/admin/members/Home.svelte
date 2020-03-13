<script>
  import Create from './Create.svelte'
  import Edit from './Edit.svelte'
  import Search from './Search.svelte'

  import { Router, Route } from 'yrv'
  import { admin } from '/stores/admin/admin.js'
</script>

<Router path="/members">
  <Route exact path="/search" component={Search} />
  <Route exact path="/create" component={Create} />
  <Route exact path="/edit/:address" component={Edit} />
  <Route fallback component={Search} />
</Router>
