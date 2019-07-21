<template>
  <nav class="nav">
    <span class="nav__logo">mz.</span>
    <span @click="toggleMenu">
      <svg-icon name="menu" class="nav__menu-open" />
    </span>
    <ul class="nav__menu" :class="{'nav__menu--visible' : showMenu}">
      <li>
        <span @click="toggleMenu">
          <svg-icon name="close" class="nav__menu-close" />
        </span>
      </li>
      <li v-for="(link, index) in links" :key="index" class="nav__item" @click="toggleMenu">
        <nuxt-link :to="link.href">{{link.name}}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      showMenu: false,
      links: [
        {
          name: "About",
          href: "/"
        },
        {
          name: "Skills",
          href: "/#skills"
        },
        {
          name: "Projects",
          href: "/#projects"
        },
        {
          name: "Services",
          href: "/#services"
        },
        {
          name: "Contact",
          href: "/#contact"
        }
      ]
    };
  },
  methods: {
    toggleMenu() {
      return (this.showMenu = !this.showMenu);
    }
  }
};
</script>

<style lang="scss">
.nav {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 7.5rem;
  padding: 0 2rem;
  background-color: $color-white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: $color-secondary;

  @media screen and (min-width: $md) {
    padding: 0 8rem;
  }

  &__logo {
    font-size: 2.6rem;
    font-weight: 700;
    color: $color-primary;
  }

  &__menu-open {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
  }

  &__menu-close {
    width: 3rem;
    height: 3rem;
    position: relative;
    left: 0;
    top: 0;
    color: $color-primary;
    cursor: pointer;
    margin-left: 2rem;
  }

  &__menu {
    box-shadow: 2px 0px 10px $color-secondary;
    position: fixed;
    top: 0;
    right: -80%;
    background-color: $color-secondary;
    width: 75%;
    height: 100vh;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    line-height: 3.5;
    font-size: 1.8rem;
    padding: 1.2rem 0;
    transition: 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    @media (min-width: 576px) {
      max-width: 30rem;
    }

    &--visible {
      right: 0;
    }
  }

  &__item {
    display: flex;

    a {
      text-decoration: none;
      color: $color-primary;
      width: 100%;
      padding: 0 3rem;
      font-weight: 700;
      transition: 0.2s ease-out;

      &:hover {
        background-color: $color-primary;
        color: $color-secondary;
      }
    }
  }

  .nuxt-link-exact-active {
    background-color: $color-primary;
    color: $color-secondary;
  }
}
</style>
