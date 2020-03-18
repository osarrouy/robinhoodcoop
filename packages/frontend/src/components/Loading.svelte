<script>
  import Spinner from 'svelte-spinner'
</script>

<style type="text/scss">
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
  }
</style>

<div class="loading">
  <Spinner size="40" speed="750" color="#ffffff" thickness="2" gap="40" />
</div>
