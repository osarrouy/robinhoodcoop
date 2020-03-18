<script>
  import { Button, Form, Input } from '/components/index'
  import { notify, isAddress, isValidEmail, isValidString, RHC } from '/lib/index'

  export let member

  let coop = RHC.new()
  let errors = { firstname: '', lastname: '', email: '' }
  let loading = false

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
    const f = validateFirstname()
    const l = validateLastname()
    const e = validateEmail()

    return f && l && e
  }

  const update = async () => {
    loading = true

    if (validate()) {
      try {
        const tx = await coop.updateMember(member.address, member.firstname, member.lastname, member.email)
        notify.default('Member being updated through tx ' + tx.hash)
        await tx.wait()
        notify.success('Member updated')
      } catch (e) {
        notify.error(e.message)
      }
    }

    loading = false
  }
</script>

<Form>
  <Input class="space-bottom" id="firstname" placeholder="firstname" message={errors.firstname} bind:value={member.firstname} />
  <Input class="space-bottom" id="lastname" placeholder="lastname" message={errors.lastname} bind:value={member.lastname} />
  <Input class="space-bottom" id="email" placeholder="email" message={errors.email} bind:value={member.email} />
  <Button disabled={loading} on:click={update}>update</Button>
</Form>
