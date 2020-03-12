<script>
  import Animate from "../../components/Animate.svelte";
  import Button from "../../components/Button.svelte";
  import { screen } from '../../stores/screen.js';
</script>

<Animate>
  <div class="flex column">
    <div class="flex">
      <Button _class="space-right" click={() => screen.set('login') }>login</Button>
      <Button click={() => screen.set('signup')}>signup</Button>
    </div>
    <p class="x-small space-top">or login here if you are an admin</p>
  </div>
</Animate>
