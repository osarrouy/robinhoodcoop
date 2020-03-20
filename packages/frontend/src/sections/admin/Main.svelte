<script>
  import { Animate } from '/components/index.js'
  import { nav } from '/stores/admin/nav.js'
</script>

<style type="text/scss">
  .wrapper {
    padding: 0 #{3 * $spacing};
    min-height: 100vh;

    main {
      display: grid;
      grid-template-rows: calc(50% - 0.5rem) calc(50% - 0.5rem);
      grid-template-columns: 30% 65%;
      grid-template-areas:
        'title content'
        'nav content';
      grid-column-gap: 5%;
      grid-row-gap: 1rem;
      align-content: stretch;
      align-items: stretch;
      justify-items: stretch;
      margin: 0 auto;
      min-height: 100vh;
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
