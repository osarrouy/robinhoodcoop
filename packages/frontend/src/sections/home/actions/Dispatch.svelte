<script>
  import { Animate, Button } from '/components/index.js'
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
