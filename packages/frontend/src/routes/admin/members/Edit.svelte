<script>
  import Animate from '/components/admin/Animate'
  import Button from '/components/Button'
  import { isAddress } from '/lib/address'
  import { coop } from '/lib/coop'
  import { getNotificationsContext } from 'svelte-notifications'
  import { Link } from 'yrv'

  import Main from '/sections/admin/Main'

  import Title from '/components/admin/Title'
  import Nav from '/components/admin/Nav'
  import Content from '/components/admin/Content'

  import Metadata from '/routes/admin/members/edit/Metadata'
  import Shares from '/routes/admin/members/edit/Shares'
  import Delete from '/routes/admin/members/edit/Delete'

  const { addNotification } = getNotificationsContext()

  export let router

  let tab = 0
  let address = router.params.address
  let shorten = address.slice(0, 6) + '...' + address.slice(-4)
</script>

<style type="text/scss">
  .tabs {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    li {
      padding-bottom: 1rem;
      color: rgba(255, 255, 255, 0.2);
      cursor: pointer;

      &:hover {
        color: #fff;
      }

      &.active {
        border-bottom: 2px solid #fff;
        color: #fff;
      }
    }
  }

  .data {
    grid-area: data;
  }
</style>

<Main>
  <Title>
    <h1>edit</h1>
    <h2 class="small">{address}</h2>
  </Title>
  <Nav>
    <Link href="/admin/members/search" class="x-small">« go back</Link>
  </Nav>
  <Content>
    <div class="data">
      <ul class="tabs">
        <li class={tab === 0 ? 'active' : ''} on:click={() => (tab = 0)}>metadata</li>
        <li class={tab === 1 ? 'active' : ''} on:click={() => (tab = 1)}>shares</li>
        <li class={tab === 2 ? 'active' : ''} on:click={() => (tab = 2)}>delete</li>
      </ul>
      {#if tab === 0}
        <Metadata member={address} />
      {:else if tab === 1}
        <Shares member={address} />
      {:else if tab === 2}
        <Delete member={address} />
      {/if}
    </div>
  </Content>
</Main>
