<script>
  import { nav } from '/stores/admin/nav.js'
</script>

<style type="text/scss">
  .burger {
    position: fixed;
    top: 1em;
    left: 1em;
    opacity: 1;
    transition: opacity $transition;

    &.hidden {
      opacity: 0;
    }

    div {
      background-color: $light-white;
      width: 15px;
      height: 2px;
      margin: 2px 0;
    }
  }
</style>

<div on:click|stopPropagation={() => ($nav = true)} class="burger {$nav ? 'hidden' : ''}">
  <div />
  <div />
  <div />
</div>
