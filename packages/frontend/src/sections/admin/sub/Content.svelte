<script>
  export let _class
  export { _class as class }
</script>

<style type="text/scss">
  section {
    grid-area: content;
    min-height: calc(100vh - #{2 * $spacing});
    margin: $spacing 0;
    overflow: scroll;
  }
</style>

<section class={_class}>
  <slot />
</section>
