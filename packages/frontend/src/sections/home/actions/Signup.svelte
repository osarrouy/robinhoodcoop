<script>
  import { Animate, Mail, Submit } from '/components/index.js'
  import { Member }                from '/lib/index.js'
  import { member }                from '/stores/member.js'
  import { getContext }            from 'svelte'
  import Terms                     from './Terms.md'

  let email     = ''
  let address   = ''
  let firstname = ''
  let lastname  = ''
  let loading   = false
  let message   = ''
  let checked   = false
  let user      = null

  const { open } = getContext('simple-modal')

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
        //   var myInit = { method: 'GET',
        //        headers: myHeaders,
        //        mode: 'cors',
        //        cache: 'default' };

        // fetch('flowers.jpg',myInit)
        // .then(function(response) {
        //   return response.blob();
        // })
          const url = 'https://keen-turing-a8352a.netlify.app/.netlify/functions/mail?firstname=' + firstname + '&lastname=' + lastname + '&email=' + email

          const response = await fetch(url, { method: 'GET', mode: 'no-cors' })
          console.log('Response')
          console.log(response)
          // user = { address: $member.address, firstname, lastname, email: $member.email }
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
      <p class="small">Your membership request will be reviewed by an admin. Please:</p>
      <p class="small">1. use your real name</p>
      <p class="small">1. use the same email you are identified with if you already are a RobinHood member</p>
      <p class="small space-top">Once you click on 'signup' a Fortmatic window will pop up. This Formatic account will identify you on this platform.</p>
      <form class="space-top" on:submit|preventDefault={signup}>
        <div class="flex"><input bind:value={email} placeholder="me@mail.com" /></div>
        <div class="flex space-top"><input class="space-top" bind:value={address} placeholder="1 Rue des Dames, 75001 Paris, France" /></div>
        <div class="flex space-top">
          <input class="space-right" bind:value={firstname} placeholder="firstname" />
          <input bind:value={lastname} placeholder="lastname" />
        </div>
        <div class="flex space-top">
          <input class="space-right" type="checkbox"  bind:checked={checked} />
          <p class="info">I agree with the <a href="/#" on:click|preventDefault={showTerms}>terms and conditions</a>.</p>
        </div>
        <div class="flex space-top">
          <Submit disabled={loading} value="signup" />
        </div>
        <p class="info space-top">{message}</p>
      </form>
    </Animate>
  {/if}
</section>
