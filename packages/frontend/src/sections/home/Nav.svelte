<script>
  import { Animate } from '/components/index.js'
  import { Member } from '/lib/index.js'
  import { member } from '/stores/member.js'
  import { screen } from '/stores/screen.js'

  const logout = async () => {
    await Member.logout()
    screen.set('home')
  }
</script>

<style>
  section.nav {
    align-self: end;
    grid-area: nav;
  }

  @media screen and (max-width: 980px) {
    section.nav {
      align-self: center;
      justify-self: start;
    }
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
