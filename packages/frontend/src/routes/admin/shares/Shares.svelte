<script>
  import { Content, Main, Title } from '/sections/admin/index.js'
  import Button from '/components/Button'
  import { notify, toFormattedDecimals, toFixed, RHC } from '/lib/index.js'
  import { onMount } from 'svelte'

  let coop = RHC.new()
  let supply = '...'
  let value = '...'
  let loading = false
  let update

  const fetchValue = async () => {
    value = toFormattedDecimals(await coop.value())
  }

  const updateValue = async () => {
    loading = true

    try {
      const tx = await coop.updateValue(toFixed(update))
      notify.default('Value being updated through tx ' + tx.hash)
      await tx.wait()
      notify.success('Value updated')
      update = null
      await fetchValue()
    } catch (e) {
      notify.error(e.message)
    }

    loading = false
  }

  onMount(() => {
    fetchValue()
  })
</script>

<style type="text/scss">
  :global(.shares) {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 2rem);
    align-items: flex-start;
    justify-content: center;

    table {
      border-collapse: separate;
      border-spacing: #{2 * $spacing} $spacing;
      margin-top: -#{$spacing};
      margin-bottom: -#{$spacing};
      margin-left: -#{2 * $spacing};
    }
  }
</style>

<Main>
  <Title>
    <h1>Shares</h1>
  </Title>
  <Content class="shares">
    <table>
      <tr>
        <td class="strong">supply</td>
        <td>5439.54 shares</td>
      </tr>
      <tr>
        <td class="strong">value</td>
        <td>
          <span>{value} USD / share</span>
        </td>
      </tr>
    </table>
    <section class="flex space-top">
      <input type="number" bind:value={update} placeholder={value} class="space-right" />
      <Button type="small" disabled={loading} on:click={() => updateValue()}>update value</Button>
    </section>
  </Content>
</Main>
