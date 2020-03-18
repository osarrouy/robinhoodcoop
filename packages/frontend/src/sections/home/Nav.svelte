<script>
  import { Animate } from '/components/index.js'
  import { member } from '/stores/member.js'
  import { screen } from '/stores/screen.js'

  const logout = async () => {
    await $member.account.logout()
    screen.set('home')
    member.set(null)
  }
</script>

<style>
  section.nav {
    align-self: end;
    grid-area: nav;
  }
</style>

<section class="nav x-small">
  {#if $screen === 'login' || $screen === 'signup'}
    <Animate>
      «
      <a href="/" on:click|preventDefault={() => screen.set('home')}>go back</a>
    </Animate>
  {:else if $screen === 'dashboard'}
    <Animate>
      «
      <a href="/" on:click|preventDefault={() => logout()}>logout</a>
    </Animate>
  {/if}
</section>
