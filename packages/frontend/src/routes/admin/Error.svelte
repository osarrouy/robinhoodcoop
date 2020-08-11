<script>
  export let metamask
  export let network
  export let isAdmin
</script>

<style type="text/scss">
  section {
    min-height: 100vh;
    width: 100vw;
  }
</style>

<section class="flex column centered">
  {#if !metamask}
    <img src="/img/metamask.png" alt="Metamask" />
    <p>
      <a href="https://metamask.io" target="_blank">install</a>
      or enable Metamask
    </p>
  {:else if network !== '1'}
    <p>Your are connected to the wrong network. Please select the mainnet network in Metamask.</p>
  {:else if !isAdmin}
    <p>Your are not identified as a RobinHoodCoop admin. Please pick up a different account in Metamask.</p>
  {/if}
</section>
