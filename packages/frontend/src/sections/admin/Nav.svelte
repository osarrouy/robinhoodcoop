<script>
  import { nav } from '/stores/admin/nav.js'
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

    &.opened {
      left: 0;
    }

    ul {
      li {
        margin: $spacing 0;

        :global(a) {
          line-height: #{2 * $spacing};
          padding: $spacing;
          text-decoration: none;

          &[aria-current] {
            border-left: 2px solid white;
            color: white;
            padding-left: calc(#{$spacing} - 2px);
          }
        }
      }
    }
  }
</style>

<nav class="nav {$nav ? 'opened' : ''}">
  <ul>
    <li>
      <Link href="/admin/members">members</Link>
    </li>
    <li>
      <Link href="/admin/admins">admins</Link>
    </li>
    <li>
      <Link href="/admin/shares">shares</Link>
    </li>
  </ul>
</nav>
