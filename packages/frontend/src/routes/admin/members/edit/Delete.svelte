<script>
  import { Button } from '/components/index.js'
  import { notify, RHC } from '/lib/index'

  export let member

  let coop = RHC.new()
  let loading = false

  const _delete = async () => {
    loading = true

    try {
      const tx = await coop.deleteMember(member.address)
      notify.default('Member being deleted through tx ' + tx.hash)
      await tx.wait()
      notify.success('Member deleted')
    } catch (e) {
      notify.error(e.message)
    }

    loading = false
  }
</script>

<section class="flex column centered">
  <Button disabled={loading} on:click={_delete}>delete</Button>
  <p class="info x-small space-top">WARNING. Only metadata will be deleted. The member's shares won't be burnt.</p>
</section>
