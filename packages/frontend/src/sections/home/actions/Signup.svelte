<script>
  import { Animate, Button, Mail } from '/components/index.js'
  import { Member } from '/lib/index.js'
  import { member } from '/stores/member.js'

  let email = ''
  let firstname = ''
  let lastname = ''
  let loading = false
  let message = ''
  let user = null

  const signup = async email => {
    loading = true
    message = 'Check your inbox [including your spam folder]'

    try {
      await Member.logout()
      await Member.authenticate(email)
      await Member.login()
      if (await Member.isMember()) {
        message = 'You are already signed up with this address. Go back and login.'
      } else {
        message = ''
        user = { address: $member.address, firstname, lastname, email: $member.email }
      }
    } catch (e) {
      message = e.message
    }

    loading = false
  }
</script>

<section class="flex column">
  {#if user}
    <Animate>
      <p class="small">
        1. Request membership by email
        <Mail {user}>here</Mail>
      </p>
      <p class="small">2. Do not modify the subject nor the beginning of the email</p>
      <p class="small">3. Send the email from the same address you just registered with</p>
    </Animate>
  {:else}
    <Animate>
      <div class="flex">
        <input class="space-right" bind:value={firstname} placeholder="firstname" />
        <input bind:value={lastname} placeholder="lastname" />
      </div>
      <div class="flex space-top">
        <input class="space-right" bind:value={email} placeholder="name@email.com" />
        <Button disabled={loading} on:click={() => signup(email)}>signup</Button>
      </div>
      <p class="info space-top">{message}</p>
    </Animate>
  {/if}
</section>
