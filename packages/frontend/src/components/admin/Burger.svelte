<script>
  import { nav } from '/stores/admin/nav.js'
</script>

<style type="text/scss">
  .burger {
    position: fixed;
    top: 1em;
    left: 1em;

    div {
      width: 15px;
      height: 2px;
      background-color: rgba(255, 255, 255, 0.8);
      margin: 2px 0;
    }
  }
</style>

<div on:click|stopPropagation={() => ($nav = true)} class="burger">
  <div />
  <div />
  <div />
</div>
