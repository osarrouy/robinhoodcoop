<style lang="scss">
  section {
    grid-area: title;
    align-self: end;
    justify-self: end;
    text-align: right;

    :global(h1) {
      @include title;
    }

    :global(h2) {
      @include x-small;
    }
  }
</style>

<section>
  <slot />
</section>
