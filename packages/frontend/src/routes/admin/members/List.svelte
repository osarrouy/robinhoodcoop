<script>
  import { Content, Main, Title } from '/sections/admin/index.js'
  import { Button, Loading } from '/components/index.js'

  import { graphql, ALL_MEMBERS } from '/lib/graphql'
  import { gql } from 'apollo-boost'

  import { observe } from 'svelte-observable'
  import { Link, navigateTo } from 'yrv'

  import Select from 'svelte-select'

  const items = ['One', 'Two', 'Three']

  const SEARCH = gql`
    subscription members($where: Member_filter!) {
      members(where: $where) {
        address
        shares
        firstname
        lastname
        email
      }
    }
  `
  // where: {
  //       _and: [
  //         { published_on: {_gte: "2017-01-01"}},
  //         { published_on: {_lte: "2017-12-31"}}
  //       ]
  //     }
  let members
  let search
  let searchOn = 'firstname'

  $: {
    let where

    switch (searchOn) {
      case 'firstname':
        where = { firstname_starts_with: search }
        break
      case 'lastname':
        where = { lastname_starts_with: search }
        break
      case 'email':
        where = { email_starts_with: search }
        break
      default:
        where = { lastname_starts_with: search }
    }

    members = observe(
      graphql.subscribe({
        query: SEARCH,
        variables: { where },
      })
    )
  }
</script>

<style type="text/scss">
  .grid {
    position: relative;
    display: grid;
    grid-template-rows: 4rem auto;
    grid-template-areas:
      'top'
      'data';
    grid-row-gap: 1rem;
    height: calc(100vh - 2rem);

    .data {
      position: relative;
      grid-area: data;
      overflow: scroll;
    }

    .top {
      grid-area: top;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .search {
      position: relative;
      width: 100%;

      input {
        height: 100%;
        width: 100%;
      }

      select {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.2);
        position: absolute;
        right: 0;
        top: 0;
        margin-right: #{$spacing / 2};
        height: 100%;
        text-align-last: right;
        &:focus {
          outline: none;
        }
      }
    }
  }
</style>

<Main>
  <Title>
    <h1>Members</h1>
  </Title>
  <Content>
    <div class="grid">
      <div class="top">
        <div class="search">
          <input type="text" bind:value={search} placeholder="search" />
          <select bind:value={searchOn}>
            <option value="firstname">firstname</option>
            <option value="lastname">lastname</option>
            <option value="email">email</option>
          </select>

        </div>
        <span class="space-left small">or</span>
        <Button class="space-left" type="small" on:click={() => navigateTo('/admin/members/create')}>add a member</Button>
      </div>

      <div class="data">
        <table class="list">
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Shares</th>
            <th />
          </tr>
          {#await $members}
            <Loading />
          {:then members}

            {#each members.data.members as member}
              <tr class="small">
                <td>{member.firstname}</td>
                <td>{member.lastname}</td>
                <td>{member.email}</td>
                <td>{member.shares}</td>
                <td>
                  <Link href="/admin/members/edit/{member.address}">edit »</Link>
                </td>
              </tr>
            {/each}
            {#each members.data.members as member}
              <tr class="small">
                <td>{member.firstname}</td>
                <td>{member.lastname}</td>
                <td>{member.email}</td>
                <td>{member.shares}</td>
                <td>
                  <Link href="/admin/members/edit/{member.address}">edit »</Link>
                </td>
              </tr>
            {/each}
            {#each members.data.members as member}
              <tr class="small">
                <td>{member.firstname}</td>
                <td>{member.lastname}</td>
                <td>{member.email}</td>
                <td>{member.shares}</td>
                <td>
                  <Link href="/admin/members/edit/{member.address}">edit »</Link>
                </td>
              </tr>
            {/each}
            {#each members.data.members as member}
              <tr class="small">
                <td>{member.firstname}</td>
                <td>{member.lastname}</td>
                <td>{member.email}</td>
                <td>{member.shares}</td>
                <td>
                  <Link href="/admin/members/edit/{member.address}">edit »</Link>
                </td>
              </tr>
            {/each}
            {#each members.data.members as member}
              <tr class="small">
                <td>{member.firstname}</td>
                <td>{member.lastname}</td>
                <td>{member.email}</td>
                <td>{member.shares}</td>
                <td>
                  <Link href="/admin/members/edit/{member.address}">edit »</Link>
                </td>
              </tr>
            {/each}
          {/await}

        </table>

      </div>
    </div>
  </Content>
</Main>
