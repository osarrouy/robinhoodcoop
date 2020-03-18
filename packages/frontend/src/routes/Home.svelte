<script>
  import { Action, Data, Nav, Title } from '/sections/home/index.js'
</script>

<style type="text/scss">
  div.wrapper {
    min-height: 100vh;
    padding: $spacing;

    main {
      display: grid;
      grid-template-rows: calc(50% - #{$half-spacing}) calc(50% - #{$half-spacing});
      grid-template-columns: 45% 45%;
      grid-template-areas:
        'title nav'
        'data action';
      grid-column-gap: 10%;
      grid-row-gap: $spacing;
      min-height: calc(100vh - #{2 * $spacing});
    }
  }
</style>

<div class="wrapper">
  <main>
    <Title />
    <Data />
    <Nav />
    <Action />
  </main>
</div>
