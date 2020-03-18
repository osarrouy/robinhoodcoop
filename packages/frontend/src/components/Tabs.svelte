<script>
  export let tabs = []
  export let active = 0
</script>

<style type="text/scss">
  ul.tabs-header {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);

    li {
      padding-bottom: 1rem;
      color: rgba(255, 255, 255, 0.2);
      cursor: pointer;

      &:hover {
        color: #fff;
      }

      &.active {
        border-bottom: 2px solid #fff;
        color: #fff;
      }
    }
  }

  div.tabs-wrapper {
    overflow: hidden;
    position: relative;

    div.tabs {
      display: flex;
      position: relative;
      top: 0;
      left: 0;
      transition: left 0.3s ease-in-out;

      .tab {
        width: 100%;
        flex-shrink: 0;
      }
    }
  }
</style>

<ul class="tabs-header">
  {#each tabs as tab, i}
    <li class={active === i ? 'active' : ''} on:click={() => (active = i)}>{tab}</li>
  {/each}
</ul>
<div class="tabs-wrapper">
  <div class="tabs" style="left: {-active * 100}%">
    <slot />
  </div>
</div>
