<template>
  <section class="hero">
    <svg-icon name="hero-img" class="hero__img" />
  </section>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss">
.hero {
  padding-top: 7.5rem;
  width: 100%;
  height: 100vh;
  background-color: $bg-grey;
  background-image: url("/hero_bg.png");
  background-size: cover;
  background-position: center;

  &__img {
    max-width: 50%;
  }
}
</style>
