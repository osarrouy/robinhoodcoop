<style type="text/scss">
  main {
    margin: 0 auto;
    min-height: 100vh;
    padding: 1em;

    .grid {
      display: grid;
      grid-template-rows: 50% 50%;
      grid-template-columns: 45% 45%;
      grid-template-areas:
        'title nav'
        'data actions';
      grid-column-gap: 10%;
      grid-row-gap: 1rem;
      min-height: calc(100vh - 2em);
      width: 100%;
    }
  }
</style>

<main>
  <section class="grid">
    <slot />
  </section>
</main>
