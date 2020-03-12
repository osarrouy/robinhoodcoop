<script>
  import Dispatch from "./actions/Dispatch.svelte";
  import Member from "./actions/Member.svelte";
  import Login from "./actions/Login.svelte";
  import Signup from "./actions/Signup.svelte";
  import { screen } from '../stores/screen.js';
</script>

<style type="text/scss">
  .actions {
    grid-area: actions;
  }
</style>

<section class="actions">
  {#if $screen === 'login'}
    <Login />
  {:else if $screen === 'signup'}
    <Signup/>
  {:else if $screen === 'dashboard'}
    <Member/>
  {:else}
    <Dispatch/>
  {/if}
</section>
