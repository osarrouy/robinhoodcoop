<script>
  import { scale } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
</script>

<div class="animate" in:scale={{ delay: 300, duration: 250, easing: quintOut }} out:scale={{ duration: 250, easing: quintOut }}>
  <slot />
</div>
