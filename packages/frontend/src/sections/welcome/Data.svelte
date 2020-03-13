<script>
  import { CountUp } from 'countup.js';
  import { onMount } from 'svelte';

  export let shares;
  export let members;
  export let value;


  onMount(() => {
    const cShares = new CountUp('shares', shares, { useEasing: false });
		const cMembers = new CountUp('members', members, { useEasing: false });
		const cValue = new CountUp('value', value, { useEasing: false });
    cShares.start();
    cMembers.start();
    cValue.start();
	});

</script>

<style type="text/scss">

  .data {
    grid-area: data;
    justify-self: end;

      table {
        border-collapse: separate;
        border-spacing: 2em 1em;
        margin-top: -1em;
        margin-right: -2em;
        text-align: right;
        tr {
          opacity: 80%;

          &:first-of-type {
            font-weight: 600;
            opacity: 100%;
          }
          td {
            &:last-of-type {
              border-left: 10px;
            }
          }
        }
      }
  }
</style>

<section class="data">
  <table>
    <tr><td id="shares">0</td><td>shares</td></tr>
    <tr><td id="members">0</td><td>members</td></tr>
    <tr><td id ="value">0</td><td>USD per share</td></tr>
  </table>
</section>