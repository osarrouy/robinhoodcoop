<script>
  import Animate from '/components/Animate.svelte'
  import { screen } from '/stores/screen.js'
</script>

<style type="text/scss">
  .title {
    grid-area: title;
    align-self: end;
    justify-self: end;

    h1 {
      color: rgba(255, 255, 255, 1);
      font-family: 'Monoton';
      font-size: 3rem;
      font-weight: 100;
      line-height: 1em;
      text-transform: uppercase;
    }
  }
</style>

<section class="title">
  {#if $screen == 'dashboard'}
    <Animate>
      <h1>Your portfolio</h1>
    </Animate>
  {:else}
    <Animate>
      <h1>Robin Hood Coop</h1>
    </Animate>
  {/if}
</section>
