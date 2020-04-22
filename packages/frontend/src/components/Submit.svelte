<script>
  import Spinner from './Spinner.svelte'
  import { createEventDispatcher } from 'svelte'

  export let _class   = ''
  export let type     = ''
  export let value    = ''
  export let disabled = true
  export { _class as class }

  const dispatch = createEventDispatcher()

  const handleClick = event => {
    if (!disabled) {
      dispatch('click', event.detail)
    }
  }
</script>

<style type="text/scss">
  .button {
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 1px #fff;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;

    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: color, opacity, border 0.2s ease-in-out;
    width: fit-content;

    &.small {
      padding: 0.5em 2em;
    }

    &:active {
      transform: scale(0.95);
    }
    &.disabled {
      padding: 1.1rem 4rem;
      &:active {
        transform: none;
      }
    }
    &:hover,
    &.disabled {
      border: 1px solid rgba(255, 255, 255, 0.2);

      opacity: 100%;
      color: rgba(255, 255, 255, 1);

      &:before {
        top: 0;
        bottom: 0;
      }
    }

    &::before {
      content: '';
      position: absolute;
      background: #fff;
      opacity: 0.2;
      top: 50%;
      bottom: 50%;
      left: 0;
      right: 0;
      top: 100%;
      z-index: -1;
      transition: all 0.2s ease-in-out;
    }

    input {
      background: none;
      padding: 1.1rem 4rem;
      cursor: pointer;
    }
  }
</style>

<span class="button {disabled ? 'disabled' : ''}">
  {#if disabled}
    <Spinner />
  {:else}
    <input type="submit" value={value} class="{type} {_class}" on:click={handleClick} />
  {/if}
</span>
