<script>
  import { nav } from '/stores/admin/nav.js'
  import Animate from '/components/admin/Animate'
</script>

<style type="text/scss">
  .wrapper {
    padding: 0 3rem;
    min-height: 100vh;

    main {
      margin: 0 auto;
      // max-width: 1024px;

      display: grid;
      grid-template-rows: calc(50% - 0.5rem) calc(50% - 0.5rem);
      grid-template-columns: auto 60%;
      grid-template-areas:
        'title content'
        'nav content';
      grid-column-gap: 5rem;
      grid-row-gap: 1rem;
      align-content: stretch;

      align-items: stretch;
      justify-items: stretch;

      height: 100vh;
      width: 100%;
    }
  }
</style>

<div class="wrapper" on:click|stopPropagation={() => ($nav = false)}>
  <Animate>

    <main>
      <slot />
    </main>
  </Animate>

</div>
