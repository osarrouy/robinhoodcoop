<script>
  import { Button } from '/components/index.js'
  import { notify, toFixed, RHC } from '/lib/index.js'

  export let member

  let amount = 0
  let coop = RHC.new()
  let loading = false

  const burn = async () => {
    loading = true

    if (amount > 0) {
      try {
        const tx = await coop.burn(member.address, toFixed(amount))
        notify.default('Shares being burnt through tx ' + tx.hash)
        await tx.wait()
        notify.success('Shares burnt')
      } catch (e) {
        notify.error(e.message)
      }
    }

    loading = false
  }

  const mint = async () => {
    loading = true

    if (amount > 0) {
      try {
        const tx = await coop.mint(member.address, toFixed(amount))
        notify.default('Shares being minted through tx ' + tx.hash)
        await tx.wait()
        notify.success('Shares minted')
      } catch (e) {
        notify.error(e.message)
      }
    }

    loading = false
  }
</script>

<div class="flex column centered">
  <p class="space-bottom">
    current member balance:
    <span class="strong">{member.shares} RHS</span>
  </p>
  <div class="flex centered space-top">
    <input class="space-right " id="amount" bind:value={amount} placeholder="0" />
    <Button class="space-right" disabled={loading} on:click={mint}>mint</Button>
    <span class="space-right info x-small">or</span>
    <Button disabled={loading} on:click={burn}>burn</Button>
  </div>
  <p class="info x-small space-top">
    WARNING. This amount will be minted or burnt and therefore
    <span class="strong">added</span>
    or
    <span class="strong">substracted</span>
    to the current member's balance.
  </p>
</div>
