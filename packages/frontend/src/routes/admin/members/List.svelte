<script>
  import Animate from '/components/admin/Animate'
  import Button from '/components/Button'
  import Header from '/components/admin/Header'
  import Loading from '/components/admin/Loading'
  import { graphql, ALL_MEMBERS } from '/lib/graphql'
  import { observe } from 'svelte-observable'
  import { Link, navigateTo } from 'yrv'

  const members = observe(
    graphql.subscribe({
      query: ALL_MEMBERS,
    })
  )
</script>

<Animate>
  <Header list>
    <h1>Members</h1>
    <Button type="small" click={() => navigateTo('/admin/members/create')}>create</Button>
  </Header>
  <div class="scroll">
    {#await $members}
      <Loading />
    {:then members}
      <table>
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th>Shares</th>
          <th />
        </tr>
        {#each members.data.members as member}
          <tr class="small">
            <td>{member.firstname}</td>
            <td>{member.lastname}</td>
            <td>{member.email}</td>
            <td>{member.shares}</td>
            <td>
              <Link href="/admin/members/edit/{member.address}">edit »</Link>
            </td>
          </tr>
        {/each}
      </table>
    {/await}
  </div>
</Animate>
