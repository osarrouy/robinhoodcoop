<script>
  import { Button, Loading }      from '/components/index.js'
  import { Content, Main, Title } from '/sections/admin/index.js'
  import { graphql, ADMINS }      from '/lib/graphql'
  import { notify, RHC }               from '/lib/index'
  import { observe }              from 'svelte-observable'
  import { Link, navigateTo }     from 'yrv'

  export let account = ''

  let coop    = RHC.new()
  let loading = true
  let _admins = []
  let admins  = []
  let search  = ''

  $: {
    admins = _admins.filter(admin =>  admin.address.startsWith(search))
  }

  observe(graphql.subscribe({ query: ADMINS })).subscribe(async admins => {
    _admins = (await admins).data.admins
    loading  = false
  })
  
  const revoke = async (address) => {
    try {
      const tx = await coop.revokeAdmin(address)
      notify.default('Admin being revoked through tx ' + tx.hash)
      await tx.wait()
      notify.success('Admin revoked')
      setTimeout(() => {
        notify.clear()
        location = location
      }, 2000)
    } catch (e) {
      notify.error(e.message)
    }
  }

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
    <h1>Admins</h1>
  </Title>
  <Content>
    <div class="grid">
      <div class="top">
        <div class="search">
          <input type="text" bind:value={search} placeholder="search" />
        </div>
        <span class="space-left small">or</span>
        <Button class="space-left" type="small" on:click={() => navigateTo('/admin/admins/create')}>add an admin</Button>
      </div>
      <div class="data">
        <table class="list">
          <tr>
            <th>Address</th>
            <th />
          </tr>
          {#if loading}
            <Loading />
          {:else}
            {#each admins as admin}
              <tr class="small">
                <td><a href="{'https://etherscan.io/address/' + admin.address}" target="_blank">{admin.address}</a></td>
                <td>
                  {#if admin.address !== account}
                    <a href="/#" on:click|preventDefault={() => revoke(admin.address)}>revoke »</a>
                  {:else}
                    this is you ...
                  {/if}
                </td>
              </tr>
            {/each}
          {/if}
        </table>
      </div>
    </div>
  </Content>
</Main>
