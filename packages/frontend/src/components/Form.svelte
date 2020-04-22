<script>
  import { createEventDispatcher } from 'svelte'

  export let _class = ''
  export { _class as class }

  const dispatch = createEventDispatcher()

  const handleSubmit = event => {
    dispatch('submit', event.detail)
  }
</script>

<style type="text/scss">
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: scroll;
  }
</style>

<form class="{_class}" on:submit|preventDefault={handleSubmit}>
  <slot />
</form>
