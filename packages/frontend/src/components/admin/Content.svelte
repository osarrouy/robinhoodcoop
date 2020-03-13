<script>
  export let _class
  export { _class as class }
</script>

<style lang="scss">
  section {
    grid-area: content;
    overflow: scroll;
    // align-self: center;
    height: calc(100vh - 2rem);
    margin: 1rem 0;
  }
</style>

<section class={_class}>
  <slot />
</section>
