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

    @media screen and (max-width: 980px) { 
      main {
      align-content: start;  
      justify-content: center;  
      grid-template-rows: auto auto auto auto;
      grid-template-columns: 100%;
      grid-template-areas:
        'nav'
        'title'
        'action'
        'data';
      grid-column-gap: 10%;
      grid-row-gap: $spacing;
      } 
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
