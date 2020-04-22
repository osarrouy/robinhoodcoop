<script>
  import { Animate, Mail, Submit } from '/components/index.js'
  import { Member }                from '/lib/index.js'
  import { member }                from '/stores/member.js'

  let firstname = ''
  let lastname  = ''
  let loading   = false
  let message   = ''
  let user      = null

  const signup = async () => {
    message = ''
    loading = true

    try {
      await Member.logout()
      await Member.login()
      if (await Member.isMember()) {
        message = 'You are already signed up with this address. Go back and login.'
      } else {
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
      <form on:submit|preventDefault={signup}>
        <div class="flex">
          <input class="space-right" bind:value={firstname} placeholder="firstname" />
          <input bind:value={lastname} placeholder="lastname" />
        </div>
        <div class="flex space-top">
          <Submit disabled={loading} value="signup" />
        </div>
        <p class="info space-top">{message}</p>
      </form>
    </Animate>
  {/if}
</section>
