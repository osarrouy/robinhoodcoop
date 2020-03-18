<script>
  import { Animate, Button } from '/components/index.js'
  import { RHC } from '/lib/index.js'
  import { member } from '/stores/member.js'
  import { screen } from '/stores/screen.js'
  import Fortmatic from 'fortmatic'

  let loading = false
  let email = ''
  let message = ''

  const fm = new Fortmatic.Phantom('pk_test_E8CFA540256573E8')
  const coop = RHC.new()

  const login = async email => {
    loading = true
    message = ''

    try {
      message = 'Check your inbox [including your spam folder].'
      const account = await fm.loginWithMagicLink({ email, showUI: false })

      const metadata = await account.getMetadata()
      await account.isLoggedIn()

      if (await coop.isMember(metadata.publicAddress)) {
        member.set({ address: metadata.publicAddress, email: metadata.email, account })
        screen.set('dashboard')
      } else {
        message = 'This address is not associated to a Robin Hood member. Please provide an identified email address or signup.'
      }

      member.set({ address: metadata.publicAddress, email: metadata.email, account })
      screen.set('dashboard')
    } catch (e) {
      message = 'Please provide a valid email address.'
    }

    loading = false
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
