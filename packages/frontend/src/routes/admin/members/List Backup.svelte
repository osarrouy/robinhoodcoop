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

<style type="text/scss">
  h1.title {
    color: rgba(255, 255, 255, 1);
    font-family: 'Monoton';
    font-size: 3rem;
    font-weight: 100;
    line-height: 1em;
    text-transform: uppercase;
  }

  .flex {
    justify-content: space-between;
    witdh: 100%;
  }

  .scroll {
    height: 100vh;
    // overflow: scroll;
  }
</style>

<Animate>
  <Header list>
    <!-- <h1>Members</h1> -->
    <!-- <Button type="small" click={() => navigateTo('/admin/members/create')}>create</Button> -->
  </Header>
  <div class="flex centered">
    <div class="flex column centered">
      <h1 class="title">Members</h1>

      <Button _class="space-top" type="small" click={() => navigateTo('/admin/members/create')}>add a member</Button>

    </div>
    <div class="scroll">
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

</Animate>
