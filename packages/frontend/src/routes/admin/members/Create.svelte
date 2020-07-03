<script>
  import { Form, Input, Submit }             from '/components/index.js'
  import { notify, isAddress, RHC, toFixed } from '/lib/index'
  import { Content, Links, Main, Title }     from '/sections/admin/index.js'
  import { Link, navigateTo }                from 'yrv'
  import emailjs                             from 'emailjs-com'

  let coop    = RHC.new({ metamask: true })
  let loading = false
  let member  = { address: '', email: '', shares: 0 }
  let errors  = { address: '', email: '', shares: '' }

  const TEMPLATE_ID = 'membership_confirmation'
  const SERVICE_ID  = 'robinhoodsmtp'
  emailjs.init('user_jzjfr1GQsGlkjbK6QZpqg')

  const validateAddress = async () => {
    if (isAddress(member.address)) {
      if (!await coop.isMember(member.address)) {
        errors.address = ''
        return true
      } else {
        errors.address = 'this address already belongs to an existing member'
        return false
      }
    }
    errors.address = 'invalid ethereum address'
    return false
  }

  const validateMail = () => {
    if (member.email.length > 0) {
      errors.email = ''
      return true
    }
    errors.email = 'invalid email address'
    return false
  }

  const validateShares = () => {
    if (member.shares > 0) {
      errors.shares = ''
      return true
    }
    errors.shares = 'invalid amount of shares'
    return false
  }

  const validate = async () => {
    return await validateAddress() && await validateMail() && await validateShares()
  }

  const add = async () => {
    loading = true

    if (await validate()) {
      try {
        const tx = await coop.mint(member.address, toFixed(member.shares))
        notify.default('Member being added through tx ' + tx.hash)
        await tx.wait()
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, { email: member.email })

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
    <Form on:submit={add}>
      <Input  class="space-bottom" id="address"                          placeholder="0x"     message={errors.address} bind:value={member.address} />
      <Input  class="space-bottom" id="email"                            placeholder="0x"     message={errors.email}   bind:value={member.email} />
      <Input  class="space-bottom" id="shares" type="number" step="0.01" placeholder="shares" message={errors.shares}  bind:value={member.shares}  />
      <Submit disabled={loading} value="add" />
    </Form>
  </Content>
</Main>
