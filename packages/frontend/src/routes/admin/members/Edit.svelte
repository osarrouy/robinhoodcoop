<script>
  import { Button, Tab, Tabs }                    from '/components/index.js'
  import { isAddress, graphql, MEMBER, RHC, RHS } from '/lib/index.js'
  import { Content, Links, Main, Title }          from '/sections/admin/index.js'
  import { Burn, Mint }                           from './edit/index.js'
  import { Link }                                 from 'yrv'

  export let router

  let address = router.params.address
  let coop    = RHC.new()
  let shares  = RHS.new()
  let member  = null
  let unknown = true

  graphql
    .subscribe({
      query: MEMBER,
      variables: { id: address },
    })
    .subscribe(request => {
      member = request.data.member
    })

  $: {
    if (!isAddress(address)) {
      unknown = true
    } else {
      coop.isMember(address).then(isMember => {
        if (!isMember) {
          unknown = true
        } else {
          unknown = false
        }
      })
    }
  }
</script>

<style type="text/scss">
  :global(.edit) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  section.error {
    display: flex;
    justify-content: center;
  }
</style>

<Main>
  <Title>
    <h1>edit</h1>
    <h2><a href="{'https://etherscan.io/address/' + address}" target="_blank">{address}</a></h2>
  </Title>
  <Links>
    <Link href="/admin/members" class="x-small">« go back</Link>
  </Links>
  <Content class="edit">
    {#if !unknown && member}
      <Tabs tabs={['mint', 'burn']}>
        <Tab>
          <Mint bind:member />
        </Tab>
        <Tab>
          <Burn bind:member />
        </Tab>
      </Tabs>
    {:else}
      <section class="error">Unknown member {address}</section>
    {/if}
  </Content>
</Main>
