<script>
  import { Submit }                                   from '/components/index.js'
  import { getNotify, toDecimals, toFixed, RHC, RHS } from '/lib/index.js'
  import { getNotificationsContext }                  from 'svelte-notifications'
  import { Link, navigateTo }                         from 'yrv'

  export let member

  let amount  = 0
  let coop    = RHC.new({ metamask: true })
  let loading = false
  let share   = RHS.new({ metamask: true })
  let top     = 0

  const { addNotification, clearNotifications } = getNotificationsContext()
  const notify = getNotify(addNotification, clearNotifications)
  
  $: {
    if (member) {
      share.balanceOf(member.address).then(balance => {
        top = toDecimals(balance)
      })
    }
  }

  const burn = async (opts = { all: false}) => {
    loading = true

    if (opts.all) {
      let balance = share.balanceOf(member.address)
      const tx    = await coop.burn(member.address, balance)
      notify.default('Shares being burnt through tx ' + tx.hash)
      await tx.wait()
      amount  = 0
      balance = await share.balanceOf(member.address)
      member  = { ...member, shares: toDecimals(balance) }
      notify.success('Shares burnt. You will be redirected soon ...')
      setTimeout(() => {
        notify.clear()
        navigateTo('/admin/members')
      }, 2000)
    } else if (amount > 0) {
      try {
        const tx = await coop.burn(member.address, toFixed(amount))
        notify.default('Shares being burnt through tx ' + tx.hash)
        await tx.wait()
        notify.success('Shares burnt')
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
  <form class="flex centered space-top" on:submit|preventDefault={burn}>
    <input class="space-right " id="amount-burn" type="number" min="0" max={top} step="0.01" bind:value={amount} placeholder="0" />
    <Submit disabled={loading} value="burn" />
    <span class="space-left">or</span>
    <a class="space-left" href="/#" on:click|preventDefault={() => burn({ all: true })}>burn all</a>
  </form>
  <p class="info x-small space-top">
    <span class="strong">WARNING.</span>
    This amount will be burnt and therefore
    <span class="strong">substracted</span>
    to the current member's balance.
  </p>
</div>
