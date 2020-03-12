<script>
  import Burger from '/components/admin/Burger'
  import Content from '/sections/admin/Content'
  import Layout from '/layouts/Admin'
  import Members from './members/List.svelte'
  import MembersCreate from './members/Create.svelte'
  import MembersEdit from './members/Edit.svelte'

  import Nav from '/sections/admin/Nav'
  import { Router, Route } from 'yrv'
  import { admin } from '/stores/admin/admin.js'
</script>

<Router>
  <Layout>
    <Nav />
    <Burger />
    <Content>
      <Route exact path="/members" component={Members} />
      <Route exact path="/members/create" component={MembersCreate} />
      <Route exact path="/members/edit/:address" component={MembersEdit} />

    </Content>
  </Layout>
</Router>
