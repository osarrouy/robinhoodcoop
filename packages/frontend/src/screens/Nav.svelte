<script>
  import { member } from '../stores/member.js';
  import { screen } from '../stores/screen.js';

  const logout = async () => {
    await $member.account.logout();
    screen.set('home')
    member.set(null)
  };
</script>

<style>
  .nav {
    align-self: end;
    grid-area: nav;
  }
</style>

<section class="nav x-small">
  {#if $screen === "login" || $screen === "signup"}
    « <a href="#" on:click={() => screen.set('home')}>go back</a>
  {:else if $screen === "dashboard"}
    « <a href="#" on:click={() => logout()}>logout</a>
  {:else}
  {/if}
</section>

