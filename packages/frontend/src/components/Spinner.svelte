<script>
  import Spinner from "svelte-spinner";
</script>

<style type="text/scss">
  .spinner {
    display: flex;
    align-items: center;
  }
</style>

<div class="spinner">
  <Spinner size="20" speed="750" color="#ffffff" thickness="2" gap="40" />
</div>
