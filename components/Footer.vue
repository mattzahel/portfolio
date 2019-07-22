<template>
  <footer class="footer" id="footer">
    <Socials class="socials--light" />
    <p class="footer__text">Mateusz Zahel 2019 &copy all rights reserved</p>
    <p class="footer__text">
      Made with
      <svg-icon name="heart" width="1.5rem" height="1.5rem" />in Poland
    </p>
  </footer>
</template>

<script>
import Socials from "~/components/Socials";

export default {
  components: {
    Socials
  }
};
</script>

<style lang="scss">
.footer {
  background-color: $color-primary;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 2.5rem;

  &__text {
    font-size: 1.4rem;
    color: $color-white;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;

    & svg {
      margin: 0 0.5rem;
    }
  }
}
</style>
