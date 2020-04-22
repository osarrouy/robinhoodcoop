<script>
  import { Button, Form, Input }             from '/components/index.js'
  import { notify, isAddress, RHC, toFixed } from '/lib/index'
  import { Content, Links, Main, Title }     from '/sections/admin/index.js'
  import { Link, navigateTo }                from 'yrv'

  let coop    = RHC.new()
  let loading = false
  let member  = { address: '', shares: 0 }
  let errors  = { address: '', shares: '' }

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

  const validateShares = () => {
    if (member.shares > 0) {
      errors.shares = ''
      return true
    }
    errors.shares = 'invalid amount of shares'
    return false
  }

  const validate = async () => {
    return await validateAddress() && await validateShares()
  }

  const add = async () => {
    loading = true

    if (await validate()) {
      try {
        const tx = await coop.mint(member.address, toFixed(member.shares))
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
      <Input class="space-bottom" id="address"              placeholder="0x"     message={errors.address} bind:value={member.address} />
      <Input class="space-bottom" id="shares" type="number" placeholder="shares" message={errors.shares}  bind:value={member.shares} />
      <Button disabled={loading} on:click={add}>add</Button>
    </Form>
  </Content>
</Main>
