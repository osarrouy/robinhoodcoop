<script>
  import Animate from '/components/admin/Animate'
  import Button from '/components/Button'
  import { coop } from '/lib/coop'
  import { getNotificationsContext } from 'svelte-notifications'
  import { navigateTo } from 'yrv'
  const { addNotification, clearNotifications } = getNotificationsContext()

  export let member
  let loading = false
  let amount = 0
  let balance = '_'

  const _delete = async () => {
    loading = true

    try {
      const tx = await coop.deleteMember(member)

      addNotification({
        position: 'bottom-center',
        text: 'Member being deleted through tx ' + tx.hash,
      })

      await tx.wait()

      addNotification({
        position: 'bottom-center',
        type: 'success',
        text: 'Member deleted! You will be redirected soon ...',
      })

      setTimeout(() => {
        clearNotifications()
        navigateTo('/admin/members')
      }, 7000)
    } catch (e) {
      loading = false

      addNotification({
        position: 'bottom-center',
        type: 'danger',
        text: e.message,
      })
    }
  }
</script>

<Animate>
  <div class="flex column centered">
    <p class="space-bottom">
      current member balance:
      <span class="strong">{balance} RHS</span>
    </p>
    <div class="flex centered space-top">
      <input class="space-right " id="address" bind:value={amount} placeholder="0" />
      <Button _class="space-right" disabled={loading} click={_delete}>mint</Button>
      <span class="space-right info x-small">or</span>
      <Button _class="space-right" disabled={loading} click={_delete}>burn</Button>
    </div>
    <p class="info x-small space-top">
      WARNING. This amount will be minted or burnt and therefore
      <span class="strong">added</span>
      or
      <span class="strong">substracted</span>
      to the current member's balance.
    </p>
  </div>
</Animate>
