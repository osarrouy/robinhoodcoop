<script>
  import { Button }                                from '/components/index.js'
  import { notify, toDecimals, toFixed, RHC, RHS } from '/lib/index.js'

  export let member

  let amount  = 0
  let coop    = RHC.new()
  let loading = false
  let share   = RHS.new()

  const mint = async () => {
    loading = true

    if (amount > 0) {
      try {
        const tx = await coop.mint(member.address, toFixed(amount))
        notify.default('Shares being minted through tx ' + tx.hash)
        await tx.wait()
        notify.success('Shares minted')
        amount        = 0
        const balance = await share.balanceOf(member.address)
        member = { ...member, shares: toDecimals(balance) }
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
    <input class="space-right " id="amount-mint" bind:value={amount} placeholder="0" />
    <Button class="space-right" disabled={loading} on:click={mint}>mint</Button>
  </div>
  <p class="info x-small space-top">
    <span class="strong">WARNING.</span>
    This amount will be minted and therefore
    <span class="strong">added</span>
    to the current member's balance.
  </p>
</div>
