<script>
  import Spinner from 'svelte-spinner'
  import { loading } from '/stores/admin/loading'
</script>

<style type="text/scss">
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
</style>

{#if $loading}
  <div class="loading">
    <Spinner size="40" speed="750" color="#ffffff" thickness="2" gap="40" />
  </div>
{/if}
