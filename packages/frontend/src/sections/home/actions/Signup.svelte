<script>
  import Animate from '/components/Animate.svelte'
  import Button from '/components/Button.svelte'
  import Mail from '/components/Mail.svelte'
  import Fortmatic from 'fortmatic'

  let user = null
  let email = ''
  let loading = false
  let message = ''

  const fm = new Fortmatic.Phantom('pk_test_E8CFA540256573E8')

  const signup = async email => {
    loading = true
    message = 'Check your inbox [including your spam folder]'

    try {
      const account = await fm.loginWithMagicLink({ email, showUI: false })
      await account.isLoggedIn()
      const metadata = await account.getMetadata()
      user = { address: metadata.publicAddress, email: metadata.email }
    } catch (e) {
      loading = false
      message = 'Please provide a valid email address'
    }
  }
</script>

<div class="flex column">
  {#if user}
    <Animate>
      <p class="small">
        1. Request membership by email
        <Mail {user}>here</Mail>
        .
      </p>
      <p class="small">2. Do not modify the subject nor the beginning of the email.</p>
      <p class="small">3. Send the email from the same address you just registered with.</p>
    </Animate>
  {:else}
    <Animate>
      <div class="flex">
        <input class="space-right" bind:value={email} placeholder="name@email.com" />
        <Button disabled={loading} on:click={() => signup(email)}>signup</Button>
      </div>
      <p class="info x-small space-top">{message}</p>
    </Animate>
  {/if}
</div>
