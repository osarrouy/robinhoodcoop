<script>
  export let id = ''
  export let message = ''
  export let placeholder = ''
  export let value = ''
  export let _class = ''
  export { _class as class }
</script>

<style type="text/scss">
  div.input {
    display: flex;
    flex-direction: column;

    label {
      font-size: 0.8rem;
      text-transform: uppercase;
    }
  }
</style>

<div class="input {_class}">
  <label for={id}>{id}</label>
  <input {id} bind:value {placeholder} />
  <p class="info x-small">{message}</p>
</div>
