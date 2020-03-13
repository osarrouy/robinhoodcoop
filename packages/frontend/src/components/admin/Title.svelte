<style lang="scss">
  section {
    grid-area: title;
    align-self: end;
    justify-self: end;
    text-align: right;

    :global(h1) {
      color: rgba(255, 255, 255, 1);
      font-family: 'Monoton';
      font-size: 3rem;
      font-weight: 100;
      line-height: 1em;
      text-shadow: 0 0 7px #fff;
      text-transform: uppercase;
    }
  }
</style>

<section>
  <slot />
</section>
