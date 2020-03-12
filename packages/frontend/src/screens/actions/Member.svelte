<script>
  import Animate from '../../components/Animate.svelte'
  import { member } from '../../stores/member.js';
</script>

<Animate>
  {#if $member}
    <p class="strong">{$member.email}</p>
    <p>{$member.address}</p>
  {/if}
</Animate>
