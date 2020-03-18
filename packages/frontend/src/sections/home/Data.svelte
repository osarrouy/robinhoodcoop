<script>
  import { Animate } from '/components/index.js'
  import { graphql, toDecimals, MEMBERS, RHC, RHS } from '/lib/index.js'
  import { CountUp } from 'countup.js'
  import { onMount } from 'svelte'

  onMount(async () => {
    const coop = RHC.new()
    const share = RHS.new()

    graphql
      .subscribe({
        query: MEMBERS,
      })
      .subscribe(async result => {
        const members = result.data.members.length
        const value = await coop.value()
        const supply = await share.totalSupply()
        const cShares = new CountUp('shares', toDecimals(supply), { useEasing: false })
        const cMembers = new CountUp('members', members, { useEasing: false })
        const cValue = new CountUp('value', toDecimals(value), { useEasing: false })

        cShares.start()
        cMembers.start()
        cValue.start()
      })
  })
</script>

<style type="text/scss">
  section.data {
    grid-area: data;
    justify-self: end;

    table {
      border-collapse: separate;
      border-spacing: #{2 * $spacing} $spacing;
      margin-top: -#{$spacing};
      margin-right: -#{2 * $spacing};
      text-align: right;

      tr {
        &:last-of-type {
          @include strong;
        }
      }
    }
  }
</style>

<section class="data">
  <Animate>
    <table>
      <tr>
        <td id="shares">0</td>
        <td>shares</td>
      </tr>
      <tr>
        <td id="members">0</td>
        <td>members</td>
      </tr>
      <tr>
        <td id="value">0</td>
        <td>USD per share</td>
      </tr>
    </table>
  </Animate>
</section>
