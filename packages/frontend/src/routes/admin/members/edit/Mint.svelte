<script>
  import { Submit }                                   from '/components/index.js'
  import { getNotify, toDecimals, toFixed, RHC, RHS } from '/lib/index.js'
  import { getNotificationsContext }                  from 'svelte-notifications'

  export let member

  let amount  = 0
  let coop    = RHC.new({ metamask: true })
  let loading = false
  let share   = RHS.new({ metamask: true })

  const { addNotification, clearNotifications } = getNotificationsContext()
  const notify = getNotify(addNotification, clearNotifications)

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
  <form class="flex space-top" on:submit|preventDefault={mint}>
    <input class="space-right" id="amount-mint" type="number" min="0" step="0.01" bind:value={amount} placeholder="0" />
    <Submit disabled={loading} class="space-right" value="mint" />
  </form>
  <p class="info x-small space-top">
    <span class="strong">WARNING.</span>
    This amount will be minted and therefore
    <span class="strong">added</span>
    to the current member's balance.
  </p>
</div>
