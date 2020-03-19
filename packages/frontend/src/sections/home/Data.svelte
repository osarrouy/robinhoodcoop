<script>
  import { Animate } from '/components/index.js'
  import { graphql, toDecimals, MEMBERS, RHC, RHS } from '/lib/index.js'
  import { screen } from '/stores/screen.js'
  import { member } from '/stores/member.js'
  import BigNumber from 'bignumber.js'
  import { CountUp } from 'countup.js'

  let oLoaded = false
  let pLoaded = false

  const coop = RHC.new()
  const share = RHS.new()

  const fetchPortfolio = async () => {
    if (!pLoaded) {
      pLoaded = true
      oLoaded = false

      const shares = toDecimals(await share.balanceOf($member.address))
      const value = toDecimals(await coop.value())
      const portfolio = new BigNumber(shares).multipliedBy(new BigNumber(value))

      const cShares = new CountUp('m-shares', shares, { useEasing: false })
      const cValue = new CountUp('m-value', value, { useEasing: false })
      const cPortfolio = new CountUp('m-portfolio', portfolio.toNumber(), { useEasing: false })

      cShares.start()
      cValue.start()
      cPortfolio.start()
    }
  }

  const fetchOverall = async () => {
    if (!oLoaded) {
      oLoaded = true
      pLoaded = false

      graphql
        .subscribe({
          query: MEMBERS,
        })
        .subscribe(async result => {
          const supply = await share.totalSupply()
          const members = result.data.members.length
          const value = await coop.value()
          const cShares = new CountUp('o-shares', toDecimals(supply), { useEasing: false })
          const cMembers = new CountUp('o-members', members, { useEasing: false })
          const cValue = new CountUp('o-value', toDecimals(value), { useEasing: false })

          cShares.start()
          cMembers.start()
          cValue.start()
        })
    }
  }

  $: {
    if ($screen === 'dashboard') {
      fetchPortfolio()
    } else {
      fetchOverall()
    }
  }
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
  {#if $screen === 'dashboard'}
    <Animate>
      <table>
        <tr>
          <td id="m-shares">0</td>
          <td>shares</td>
        </tr>
        <tr>
          <td id="m-value">0</td>
          <td>USD per share</td>
        </tr>
        <tr>
          <td id="m-portfolio">0</td>
          <td>$ total</td>
        </tr>
      </table>
    </Animate>
  {:else}
    <Animate>
      <table>
        <tr>
          <td id="o-members">0</td>
          <td>members</td>
        </tr>
        <tr>
          <td id="o-shares">0</td>
          <td>shares</td>
        </tr>
        <tr>
          <td id="o-value">0</td>
          <td>USD per share</td>
        </tr>
      </table>
    </Animate>
  {/if}
</section>
