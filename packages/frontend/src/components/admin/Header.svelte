<script>
  export let list = false
</script>

<style lang="scss">
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    &.list {
      margin-left: 1rem;
    }

    :global(h1) {
      color: rgba(255, 255, 255, 0.8);
      font-family: 'Monoton';
      font-size: 3rem;
      line-height: 1em;
      text-transform: uppercase;
    }
  }
</style>

<header class={list ? 'list' : ''}>
  <slot />
</header>
