<script>
  import Animate from '/components/Animate.svelte'
  import Button from '/components/Button.svelte'
  import Fortmatic from 'fortmatic'

  import { member } from '/stores/member.js'
  import { screen } from '/stores/screen.js'

  let email = ''
  let loading = false
  let message = ''

  const fm = new Fortmatic.Phantom('pk_test_E8CFA540256573E8')

  const login = async email => {
    loading = true
    message = 'Check your inbox [including your spam folder]'

    try {
      const account = await fm.loginWithMagicLink({ email, showUI: false })
      const metadata = await account.getMetadata()
      await account.isLoggedIn()

      member.set({ address: metadata.publicAddress, email: metadata.email, account })
      screen.set('dashboard')
    } catch (e) {
      loading = false
      message = 'Make sure to provide a valid email address'
    }
  }
</script>

<Animate>
  <div class="flex column">
    <div class="flex">
      <input class="space-right" bind:value={email} placeholder="name@email.com" />
      <Button disabled={loading} on:click={() => login(email)}>login</Button>
    </div>
    <p class="info x-small space-top">{message}</p>
  </div>
</Animate>
