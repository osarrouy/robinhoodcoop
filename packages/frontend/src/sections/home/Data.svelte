<script>
  import { Animate }                                       from '/components/index.js'
  import { graphql, toDecimals, MEMBERS, SHARE, RHC, RHS } from '/lib/index.js'
  import { screen }                                        from '/stores/screen.js'
  import { member }                                        from '/stores/member.js'
  import BigNumber                                         from 'bignumber.js'

  let members   = '...'
  let portfolio = '...'
  let shares    = '...'
  let supply    = '...'
  let value     = '...'
  let timestamp = '...'
  let isSmall = false

  const coop  = RHC.new()
  const share = RHS.new()

  const updateIsSmall = () => {
    isSmall = window.matchMedia('(max-width: 980px)').matches;
    console.log(isSmall)
  }

  updateIsSmall()

  window.matchMedia('(max-width: 980px)').addListener(updateIsSmall);

  graphql
    .subscribe({
      query: MEMBERS,
    })
    .subscribe(async result => {
      supply  = toDecimals(await share.totalSupply())
      members = result.data.members.length
    })

  graphql
    .subscribe({
      query: SHARE,
    })
    .subscribe(async result => {
      const date = new Date(result.data.share.timestamp * 1000)
      value      = result.data.share.value
      timestamp  = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
    })

  member.subscribe(async _member => {
    if (_member) {
      shares    = toDecimals(await share.balanceOf(_member.address))
      portfolio = new BigNumber(shares).multipliedBy(new BigNumber(value)).toNumber()
    } else {
      shares    = '...'
      portfolio = '...'
    }
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

    p.date {
      text-align: right;
    }
  }

  @media screen and (max-width: 980px) {
    section.data {
      align-self: center;
      justify-self: center;
    }
  }
</style>

<section class="data">
  {#if $screen === 'dashboard'}
    <Animate>
      <table>
        <tr>
          <td>{shares}</td>
          <td>shares</td>
        </tr>
        <tr>
          <td>{value}</td>
          <td>EUR per share</td>
        </tr>
        <tr>
          <td>{portfolio}</td>
          <td>€ total</td>
        </tr>
      </table>
      <!--p class="date info">values as of {timestamp}</p-->
      <p class="date info">values as of 30/06/2020</p>
  </Animate>
  {:else if $screen === 'signup' && !isSmall}
    <Animate>
      <table>
        <tr>
          <td>840</td>
          <td>members</td>
        </tr>
        <tr>
          <td>{members}/td>
          <td>members on blockchain</td>
        </tr>
        <tr>
          <td>19495</td>
          <td>total coop shares</td>
        </tr>
        <tr>
          <td>{supply}</td>
          <td>total shares on blockchain</td>
        </tr>
        <tr>
          <td>{value}</td>
          <td>EUR per share</td>
        </tr>
      </table>
      <!--p class="date info">last updated on {timestamp}</p -->
      <p class="date info">last updated on 30/06/2020</p>
  </Animate>
  {:else if $screen !== 'signup'}
    <Animate>
      <table>
        <tr>
          <td>840</td>
          <td>members</td>
        </tr>
        <tr>
          <td>{members}/td>
          <td>members on blockchain</td>
        </tr>
        <tr>
          <td>19495</td>
          <td>total coop shares</td>
        </tr>
        <tr>
          <td>{supply}</td>
          <td>total shares on blockchain</td>
        </tr>
        <tr>
          <td>{value}</td>
          <td>EUR per share</td>
        </tr>
      </table>
      <!--p class="date info">last updated on {timestamp}</p -->
      <p class="date info">last updated on 30/06/2020</p>
    </Animate>
  {/if}
</section>
