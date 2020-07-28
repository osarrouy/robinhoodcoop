<script>
  import { Dispatch, Login, Member, Signup } from './actions/index.js'
  import { screen } from '/stores/screen.js'
</script>

<style type="text/scss">
  section.action {
    grid-area: action;
    overflow: scroll;
  }

  @media screen and (max-width: 980px) {
    section.action {
      // margin-top: 2 * $spacing;
      align-self: center;
      justify-self: center;
    }
  }
</style>

<section class="action">
  {#if $screen === 'login'}
    <Login />
  {:else if $screen === 'signup'}
    <Signup />
  {:else if $screen === 'dashboard'}
    <Member />
  {:else}
    <Dispatch />
  {/if}
</section>
