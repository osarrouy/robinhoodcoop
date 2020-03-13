<script>
  import { nav } from '/stores/admin/nav.js'
  import { admin } from '/stores/admin/admin.js'
  import { Link } from 'yrv'
</script>

<style type="text/scss">
  nav {
    background-color: rgba(25, 25, 25, 0.3);
    border-right: 1px dashed rgba(255, 255, 255, 0.1);
    padding-right: 5rem;
    min-height: 100vh;
    position: fixed;
    top: 0;
    left: -100%;
    z-index: 9999;
    overflow: hidden;
    transition: all 250ms ease-in-out;

    * {
      overflow: hidden;
    }

    &.opened {
      left: 0;
    }

    .account {
      margin: 1rem 1rem 2rem 1rem;
      min-height: 1.3em;
    }

    ul {
      li {
        margin: 1rem 0;

        :global(a) {
          line-height: 2rem;
          padding: 1rem 1rem 1rem 1rem;
          text-decoration: none;

          &[aria-current] {
            border-left: 2px solid white;
            color: white;
            padding-left: calc(1rem - 2px);
          }
        }
      }
    }
  }
</style>

<nav class="nav {$nav ? 'opened' : ''}">
  <p class="account x-small">
    <!-- {#if $admin !== ''}
      {$admin}
      <a on:click={() => ($admin = '')}>logout</a>
    {/if} -->
  </p>
  <ul>
    <li>
      <Link href="/admin/members/search">members</Link>
    </li>
    <li>
      <Link href="/admin/admins">admins</Link>
    </li>
    <li>
      <Link href="/admin/shares">shares</Link>
    </li>
  </ul>
</nav>
