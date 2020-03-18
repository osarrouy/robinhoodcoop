<script>
  import { fly } from 'svelte/transition'
</script>

<div in:fly={{ y: 200, delay: 500, duration: 250 }} out:fly={{ y: 200, duration: 500 }}>
  <slot />
</div>
