<script>
  export let user
</script>

<a
  href="mailto:registration@robinhoodcoop.org?subject=[member-registration]&body=---begin%0d{user.firstname}%0d{user.lastname}%0d{user.email}%0d{user.address}%0d---end">
  <slot />
</a>
