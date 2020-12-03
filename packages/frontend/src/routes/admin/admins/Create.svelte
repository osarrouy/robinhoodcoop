<script>
  import { Form, Input, Submit }         from '/components/index.js'
  import { getNotify, isAddress, RHC }   from '/lib/index'
  import { Content, Links, Main, Title } from '/sections/admin/index.js'
  import { getNotificationsContext }     from 'svelte-notifications'
  import { Link, navigateTo }            from 'yrv'

  let coop    = RHC.new({ metamask: true })
  let loading = false
  let admin   = ''
  let error   = ''

  const { addNotification, clearNotifications } = getNotificationsContext()
  const notify = getNotify(addNotification, clearNotifications)

  const validate = async () => {
    if (isAddress(admin)) {
      if (!await coop.isAdmin(admin)) {
        error = ''
        return true
      } else {
        error = 'this address already belongs to an existing admin'
        return false
      }
    }
    error = 'invalid ethereum address'
    return false
  }

  const add = async () => {
    loading = true

    if (await validate()) {
      try {
        const tx = await coop.grantAdmin(admin)
        notify.default('Admin being added through tx ' + tx.hash)
        await tx.wait()
        notify.success('Admin added. You will be redirected soon ...')
        setTimeout(() => {
          notify.clear()
          navigateTo('/admin/admins')
        }, 2000)
      } catch (e) {
        notify.error(e.message)
      }
    }

    loading = false
  }
</script>

<Main>
  <Title>
    <h1>admin</h1>
    <h2>{admin}</h2>
  </Title>
  <Links>
    <Link href="/admin/admins" class="x-small">« go back</Link>
  </Links>
  <Content class="flex column justify-center">
    <Form on:submit={add}>
      <Input  class="space-bottom" id="address" placeholder="0x" message={error} bind:value={admin} />
      <Submit disabled={loading} value="add" />
    </Form>
  </Content>
</Main>
