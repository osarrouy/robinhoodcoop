<script>
  import Burger from '/components/admin/Burger'
  import Content from '/sections/admin/Content'
  import Main from '/sections/admin/Main'

  import Layout from '/layouts/Admin'
  import Members from './members/Home.svelte'
  import MembersCreate from './members/Create.svelte'
  import MembersEdit from './members/Edit.svelte'

  import Nav from '/sections/admin/Nav'
  import { Router, Route } from 'yrv'
  import { admin } from '/stores/admin/admin.js'

  export let router

  console.log('Admin')
  console.log(router)
</script>

<Layout>
  <Nav />
  <Burger />
  <!-- <Route exact path="/">Login</Route> -->

  <Router path="/members">
    <Route path="/" component={Members} />
    <!-- <Members /> -->
  </Router>

  <!-- <Route exact path="/members/create" component={MembersCreate} />
    <Route exact path="/members/edit/:address" component={MembersEdit} /> -->

</Layout>
