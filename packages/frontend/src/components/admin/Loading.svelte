<script>
  import Spinner from 'svelte-spinner'
</script>

<style type="text/scss">
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 2rem);
    width: 100%;
  }
</style>

<div class="loading">
  <Spinner size="40" speed="750" color="#ffffff" thickness="2" gap="40" />
</div>
