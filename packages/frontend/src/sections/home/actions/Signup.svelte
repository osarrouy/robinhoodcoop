<script>
  import { Animate, Mail, Submit } from '/components/index.js'
  import { Member }                from '/lib/index.js'
  import { member }                from '/stores/member.js'
  import { getContext }            from 'svelte'
  import Terms                     from './Terms.md'
  import emailjs                   from 'emailjs-com'

  let email     = ''
  let address   = ''
  let firstname = ''
  let lastname  = ''
  let loading   = false
  let message   = ''
  let checked   = false
  let user      = null
  let confirmed = false


  const TEMPLATE_ID = 'template_5hkdMlok'
  const SERVICE_ID  = 'robinhoodcoop'
  const { open }    = getContext('simple-modal')
  emailjs.init('user_jzjfr1GQsGlkjbK6QZpqg')

  const validate = () => {
    if (!firstname || firstname.length < 1) {
      message += '\nplease provide your firstname'
    }

    if (!lastname || lastname.length < 1) {
      message += '\nplease provide your lastname'
    }

    if (!checked) {
      message += '\nplease agree with the terms and conditions'
    }

    if (message.length > 0) {
      return  false
    }

    return true
  }

  const signup = async () => {
    message = ''
    loading = true


    if(validate()) {
      try {
        await Member.logout()
        await Member.login()
        if (await Member.isMember()) {
          message = 'You are already signed up with this address. Go back and login.'
        } else {
          console.log($member)
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            name: firstname + ' ' + lastname,
            email: email,
            address: address,
            ethereum: $member.address
          })
          confirmed = true
        }
      } catch (e) {
        message = e.message
      }
    }
    loading = false
  }
  
  const showTerms = () => {
    open(Terms)
  }
</script>

<section class="flex column">
  {#if confirmed}
    <Animate>
      <p class="small">
        Your membership request has been submitted to review by an admin.
      </p>
      <p class="small">
        We will come back to you soon.
      </p>
    </Animate>
  {:else}
    <Animate>
      <p class="x-small">Your membership request will be reviewed by an admin. Please:</p>
      <p class="x-small">1. use your real name</p>
      <p class="x-small">1. use the same email you are identified with if you already are a RobinHood member</p>
      <p class="x-small space-top">Once you click on 'signup' a Fortmatic window will pop up. This Formatic account will identify you on this platform.</p>
      <form class="space-top" on:submit|preventDefault={signup}>
        <div class="flex"><input bind:value={email} placeholder="me@mail.com" /></div>
        <div class="flex space-top"><input bind:value={address} placeholder="1 Rue des Dames, 75001 Paris, France" /></div>
        <div class="flex space-top">
          <input class="space-right" bind:value={firstname} placeholder="firstname" />
          <input bind:value={lastname} placeholder="lastname" />
        </div>
        <div class="flex space-top">
          <input class="space-right" type="checkbox"  bind:checked={checked} />
          <p class="info">I agree with the <a href="/#" on:click|preventDefault={showTerms}>terms and conditions</a>.</p>
        </div>
        <p class="info">{message}</p>
        <div class="flex space-top">
          <Submit disabled={loading} value="signup" />
        </div>
      </form>
    </Animate>
  {/if}
</section>
