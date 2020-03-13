<script>
  import { slide, fly } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'
</script>

<div class="animate" in:fly={{ y: 200, delay: 500, duration: 250 }} out:fly={{ y: 200, duration: 500 }}>
  <slot />
</div>
