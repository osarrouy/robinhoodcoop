<script>
  import Animate from '/components/admin/Animate'
  import Button from '/components/Button'
  import Header from '/components/admin/Header'
  import { isAddress } from '/lib/address'
  import { coop } from '/lib/coop'
  import { getNotificationsContext } from 'svelte-notifications'
  import { Link, navigateTo } from 'yrv'

  const { addNotification, clearNotifications } = getNotificationsContext()

  let address
  let firstname
  let lastname
  let email
  let shares
  let loading
  let errors = { address: '', firstname: '', lastname: '', email: '' }

  const validateAddress = () => {
    if (!isAddress(address)) {
      errors.address = 'invalid ethereum address'
      return false
    }
    errors.address = ''
    return true
  }

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
    const a = validateAddress()
    const f = validateFirstname()
    const l = validateLastname()
    const e = validateEmail()

    return a && f && l && e
  }

  const create = async () => {
    loading = true

    if (validate()) {
      try {
        const tx = await coop.createMember(address, firstname, lastname, email)

        addNotification({
          position: 'bottom-center',
          text: 'Member being created through tx ' + tx.hash,
        })

        await tx.wait()

        addNotification({
          position: 'bottom-center',
          type: 'success',
          text: 'Member created! You will be redirected soon ...',
        })

        setTimeout(() => {
          clearNotifications()
          navigateTo('/admin/members/edit/' + address)
        }, 7000)
      } catch (e) {
        loading = false

        addNotification({
          position: 'bottom-center',
          type: 'danger',
          text: e.message,
        })
      }
    } else {
      loading = false
    }
  }
</script>

<Animate>
  <Header>
    <Link href="/admin/members" class="x-small">« go back</Link>
    <h1>New member</h1>
  </Header>
  <section class="form">
    <div class="entry">
      <label for="address">Ethereum address</label>
      <input id="address" bind:value={address} placeholder="0x1df62f291b2e969fb0849d99d9ce41e2f137006e" />
      <p class="info x-small">{errors.address}</p>
    </div>
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
    <Button _class="space-top" disabled={loading} click={create}>create</Button>
  </section>
</Animate>
