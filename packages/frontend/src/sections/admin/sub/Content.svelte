<script>
  export let _class
  export { _class as class }
</script>

<style type="text/scss">
  section {
    grid-area: content;
    overflow: scroll;
    min-height: calc(100vh - 2rem);
    margin: 1rem 0;
  }
</style>

<section class={_class}>
  <slot />
</section>
