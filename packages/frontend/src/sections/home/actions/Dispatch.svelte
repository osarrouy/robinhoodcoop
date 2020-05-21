<script>
  import { Animate, Button } from '/components/index.js'
  import { Member }          from '/lib/index.js'
  import { member }          from '/stores/member.js'
  import { screen }          from '/stores/screen.js'
  import { Link }            from 'yrv'

  let loading = false
  let message = ''

  const login = async () => {
    message = ''
    loading = true

    try {
      await Member.login()
      if (await Member.isMember()) {
        screen.set('dashboard')
      } else {
        Member.logout()
        message = "Your account needs to be activated by an admin.\nRHcoop will send you an email as soon as your account is ready for log in.\nKeep an eye on your inbox [and spam folder too]."
      }
    } catch (err) {
      message = err.message
    }

    loading = false
  }
</script>

<Animate>
  <div class="flex column">
    <div class="flex">
      <Button disabled={loading} class="space-right" on:click={login}>login</Button>
      <Button on:click={() => screen.set('signup')}>signup</Button>
    </div>
    <p class="info space-top">{message}</p>
  </div>
</Animate>
