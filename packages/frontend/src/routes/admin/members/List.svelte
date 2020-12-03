<script>
  import { Button, Loading }      from '/components/index.js'
  import { Content, Main, Title } from '/sections/admin/index.js'
  import { graphql, MEMBERS }     from '/lib/graphql'
  import { observe }              from 'svelte-observable'
  import { Link, navigateTo }     from 'yrv'

  let loading  = true
  let _members = []
  let members  = []
  let search   = ''

  $: {
    members = _members.filter(member =>  member.address.toLowerCase().startsWith(search.toLowerCase()))
  }

  observe(graphql.subscribe({ query: MEMBERS })).subscribe(async members => {
    _members = (await members).data.members
    loading  = false
  })
  

</script>

<style type="text/scss">
  .grid {
    position: relative;
    display: grid;
    grid-template-rows: 4rem auto;
    grid-template-areas:
      'top'
      'data';
    grid-row-gap: 1rem;
    height: calc(100vh - 2rem);

    .data {
      grid-area: data;
      overflow: scroll;
      position: relative;
    }

    .top {
      grid-area: top;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .search {
      position: relative;
      width: 100%;

      input {
        height: 100%;
        width: 100%;
      }

      select {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.2);
        position: absolute;
        right: 0;
        top: 0;
        margin-right: #{$spacing / 2};
        height: 100%;
        text-align-last: right;
        &:focus {
          outline: none;
        }
      }
    }
  }
</style>

<Main>
  <Title>
    <h1>Members</h1>
  </Title>
  <Content>
    <div class="grid">
      <div class="top">
        <div class="search">
          <input type="text" bind:value={search} placeholder="search" />
        </div>
        <span class="space-left small">or</span>
        <Button class="space-left" type="small" on:click={() => navigateTo('/admin/members/create')}>add a member</Button>
      </div>
      <div class="data">
        <table class="list">
          <tr>
            <th>Address</th>
            <th>Shares</th>
            <th />
          </tr>
          {#if loading}
            <Loading />
          {:else}
            {#each members as member}
              <tr class="small">
                <td><a href="{'https://etherscan.io/address/' + member.address}" target="_blank">{member.address}</a></td>
                <td>{member.shares}</td>
                <td>
                  <Link href="/admin/members/edit/{member.address}">edit »</Link>
                </td>
              </tr>
            {/each}
          {/if}
        </table>
      </div>
    </div>
  </Content>
</Main>
