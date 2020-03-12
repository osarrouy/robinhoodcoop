<script>
  import { nav } from '/stores/admin/nav.js'
</script>

<style type="text/scss">
  .wrapper {
    padding: 1rem 3rem;
    min-height: 100vh;

    main {
      margin: 0 auto;
      max-width: 1024px;
      position: relative;
    }
  }
</style>

<div class="wrapper" on:click|stopPropagation={() => ($nav = false)}>
  <main>
    <slot />
  </main>
</div>
