<script>
  import Animate from '/components/admin/Animate'
  import Button from '/components/Button'
  import { coop } from '/lib/coop'
  import { getNotificationsContext } from 'svelte-notifications'
  import { navigateTo } from 'yrv'
  const { addNotification, clearNotifications } = getNotificationsContext()

  export let member
  let loading = false

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
    <Button disabled={loading} click={_delete}>delete</Button>
    <p class="info x-small space-top">WARNING. Only metadata will be deleted. The member's shares won't be burnt.</p>
  </div>
</Animate>
