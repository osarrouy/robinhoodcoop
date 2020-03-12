<script>
  import { fade, slide, scale, blur } from "svelte/transition";
  import { quintOut } from "svelte/easing";
</script>

<div
  class="animate"
  in:slide={{ delay: 400, duration: 350, easing: quintOut }}
  out:fade={{ duration: 350, easing: quintOut }}>
  <slot />
</div>
