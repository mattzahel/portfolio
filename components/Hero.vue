<template>
  <section class="hero">
    <div class="hero__wrapper container">
      <div class="hero__description">
        <p class="hero__about">
          Hey, I'm
          <span class="text-highlight">Mateusz Zahel</span>
          <br />I’m an aspiring
          <span class="text-highlight">junior frontend developer</span>
          <br />and
          web designer.
        </p>
        <p class="hero__about">I'm currently freelancing and looking for temporary work.</p>
        <Socials />
      </div>
      <div class="hero__img">
        <svg-icon name="hero-img" />
      </div>
      <div class="hero__button">
        <Button>more</Button>
      </div>
    </div>
  </section>
</template>

<script>
import Socials from "~/components/Socials";
import Button from "~/components/Button";

export default {
  components: {
    Socials,
    Button
  }
};
</script>

<style lang="scss">
.hero {
  padding: 10rem 1rem 2.5rem 1rem;
  width: 100%;
  height: 100vh;
  background-color: $bg-grey;
  background-image: url("/hero_bg.png");
  background-size: cover;
  background-position: center;

  @media screen and (min-width: $md) {
    background-position: bottom left;
  }

  &__wrapper {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 5rem;
    grid-template-areas: "about" "about" "btn";

    @media screen and (min-width: $md) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 15rem;
      grid-template-areas:
        "about img"
        "about img"
        "btn btn";
    }
  }
  @media screen and (min-width: $lg) {
    grid-template-rows: 1fr 1fr 30rem;
  }

  &__description {
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-area: about;
  }
  &__about {
    font-size: 2.4rem;
    font-weight: 600;
    margin: 1rem 0;
  }

  &__img {
    display: none;
    grid-area: img;

    @media screen and (min-width: $md) {
      display: flex;
      align-items: center;

      svg {
        width: 100%;
        height: 40rem;
      }
    }
  }
  &__button {
    grid-area: btn;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    @media screen and (min-width: 360px) {
      padding-bottom: 2.5rem;
    }
  }
}
</style>
