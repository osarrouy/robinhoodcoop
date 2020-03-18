<script>
  import { Button, Form, Input } from '/components/index.js'
  import { notify, isAddress, isValidEmail, isValidString, RHC } from '/lib/index'
  import { Content, Links, Main, Title } from '/sections/admin/index.js'
  import { Link, navigateTo } from 'yrv'

  let coop = RHC.new()
  let loading = false
  let member = { address: '', firstname: '', lastname: '', email: '' }
  let errors = { address: '', firstname: '', lastname: '', email: '' }

  const validateAddress = () => {
    if (isAddress(member.address)) {
      errors.address = ''
      return true
    }
    errors.address = 'invalid ethereum address'
    return false
  }

  const validateFirstname = () => {
    if (isValidString(member.firstname)) {
      errors.firstname = ''
      return true
    }
    errors.firstname = 'invalid firstname'
    return false
  }

  const validateLastname = () => {
    if (isValidString(member.lastname)) {
      errors.lastname = ''
      return true
    }
    errors.lastname = 'invalid lastname'
    return false
  }

  const validateEmail = () => {
    if (isValidEmail(member.email)) {
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

  const add = async () => {
    loading = true

    if (validate()) {
      try {
        const tx = await coop.createMember(member.address, member.firstname, member.lastname, member.email)
        notify.default('Member being added through tx ' + tx.hash)
        await tx.wait()
        notify.success('Member added. You will be redirected soon ...')
        setTimeout(() => {
          notify.clear()
          navigateTo('/admin/members/edit/' + member.address.toLowerCase())
        }, 2000)
      } catch (e) {
        notify.error(e.message)
      }
    }

    loading = false
  }
</script>

<Main>
  <Title>
    <h1>member</h1>
    <h2>{member.address}</h2>
  </Title>
  <Links>
    <Link href="/admin/members" class="x-small">« go back</Link>
  </Links>
  <Content class="flex column justify-center">
    <Form>
      <Input class="space-bottom" id="address" placeholder="0x" message={errors.address} bind:value={member.address} />
      <Input class="space-bottom" id="firstname" placeholder="firstname" message={errors.firstname} bind:value={member.firstname} />
      <Input class="space-bottom" id="lastname" placeholder="lastname" message={errors.lastname} bind:value={member.lastname} />
      <Input class="space-bottom" id="email" placeholder="email" message={errors.email} bind:value={member.email} />
      <Button disabled={loading} on:click={add}>add</Button>
    </Form>
  </Content>
</Main>
