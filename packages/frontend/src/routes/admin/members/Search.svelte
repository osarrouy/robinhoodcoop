<script>
  import Main from '/sections/admin/Main'
  import Title from '/components/admin/Title'
  import Nav from '/components/admin/Nav.svelte'
  import Content from '/components/admin/Content'
  import Button from '/components/Button'
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

<style type="text/scss">
  .grid {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-areas:
      'top'
      'data';
    grid-row-gap: 1rem;
    height: calc(100vh - 2rem);

    input {
      grid-area: top;
    }

    .data {
      grid-area: data;
      overflow: scroll;
    }
  }
</style>

<Main>
  <Title>
    <h1>Members</h1>
  </Title>
  <Nav>
    <Button on:click={() => navigateTo('/admin/members/create')}>add a member</Button>
  </Nav>
  <Content>
    <div class="grid">
      <input type="text" placeholder="search" />
      <div class="data">
        {#await $members}
          <Loading />
        {:then members}
          <table class="list">
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
    </div>
  </Content>
</Main>
