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
        message = 'This address is not associated to a Robin Hood member. Please login with another account or signup.'
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
