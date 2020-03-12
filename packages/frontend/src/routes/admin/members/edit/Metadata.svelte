<script>
  import Animate from '/components/admin/Animate'
  import Button from '/components/Button'
  import Header from '/components/admin/Header'
  import { isAddress } from '/lib/address'
  import { coop } from '/lib/coop'
  import { getNotificationsContext } from 'svelte-notifications'
  import { Link } from 'yrv'
  const { addNotification } = getNotificationsContext()

  export let member
  let address
  export let firstname
  export let lastname
  export let email
  export let shares

  if (isAddress(member)) {
    coop.isMember(member).then(is => {
      if (!is) {
        unknown = true
      } else {
        coop.member(member).then(_member => {
          address = member
          firstname = _member.firstname
          lastname = _member.lastname
          email = _member.email
        })
      }
    })
  } else {
    unknown = true
  }

  let loading
  let errors = { address: '', firstname: '', lastname: '', email: '' }

  const validateFirstname = () => {
    if (!firstname || firstname.length === 0) {
      errors.firstname = 'invalid firstname'
      return false
    }
    errors.firstname = ''
    return true
  }

  const validateLastname = () => {
    if (!lastname || lastname.length === 0) {
      errors.lastname = 'invalid lastname'
      return false
    }
    errors.lastname = ''
    return true
  }

  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      errors.email = ''
      return true
    }
    errors.email = 'invalid email address'
    return false
  }

  const validate = () => {
    const f = validateFirstname()
    const l = validateLastname()
    const e = validateEmail()

    return f && l && e
  }

  const update = async () => {
    loading = true

    if (validate()) {
      try {
        const tx = await coop.updateMember(address, firstname, lastname, email)

        addNotification({
          position: 'bottom-center',
          text: 'Member being updated through tx ' + tx.hash,
        })

        await tx.wait()

        addNotification({
          position: 'bottom-center',
          type: 'success',
          text: 'Member updated!',
        })
      } catch (e) {
        addNotification({
          position: 'bottom-center',
          type: 'danger',
          text: e.message,
        })
      }
    }

    loading = false
  }
</script>

<Animate>
  <section class="form">
    <div class="entry">
      <label for="firstname">firstname</label>
      <input id="firstname" bind:value={firstname} placeholder="firstname" />
      <p class="info x-small">{errors.firstname}</p>
    </div>
    <div class="entry">
      <label for="lastname">lastname</label>
      <input id="lastname" bind:value={lastname} placeholder="firstname" />
      <p class="info x-small">{errors.lastname}</p>
    </div>
    <div class="entry">
      <label for="email">email</label>
      <input id="email" bind:value={email} type="email" placeholder="member@email.com" />
      <p class="info x-small">{errors.email}</p>
    </div>
    <Button _class="space-top" disabled={loading} click={update}>update</Button>
  </section>
</Animate>
