<script>
  import Animate from '/components/Animate.svelte'
  import Button from '/components/Button.svelte'
  import { screen } from '/stores/screen.js'
  import { Link } from 'yrv'
</script>

<Animate>
  <div class="flex column">
    <div class="flex">
      <Button class="space-right" on:click={() => screen.set('login')}>login</Button>
      <Button on:click={() => screen.set('signup')}>signup</Button>
    </div>
    <p class="x-small space-top">
      or login
      <Link href="/admin">here</Link>
      if you are an admin
    </p>
  </div>
</Animate>
