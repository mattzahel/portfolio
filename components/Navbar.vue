<template>
  <nav class="nav container">
    <h1>logo</h1>
    <svg-icon name="menu" width="20px" height="20px" />
  </nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss">
.nav {
  height: 7.5rem;
  background-color: $color-primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
