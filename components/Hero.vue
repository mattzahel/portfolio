<template>
  <section class="hero">
    <div class="hero__wrapper container">
      <div class="hero__description">
        <p class="hero__about">
          Hey, I'm
          <span class="text-highlight">Mateusz Zahel</span>
        </p>
        <p class="hero__about">Currently working for <a href="https://www.boldare.com/" target="_blank" class="text-highlight">Boldare</a>
          <br />
          as a frontend developer.
        </p>
          <Socials />
      </div>
      <div class="hero__img">
        <svg-icon name="hero-img" />
      </div>
      <div class="hero__button">
        <nuxt-link to="#skills" class="button__link">
          <Button>more</Button>
        </nuxt-link>
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
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

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
    animation: fadeUp 1.2s cubic-bezier(0.22, 0.84, 0.68, 1);
  }
  &__about {
    font-size: 2.4rem;
    font-weight: 600;
    margin: 1rem 0;

    a {
      text-decoration: none;
    }
  }

  &__img {
    display: none;
    grid-area: img;
    animation: fadeUp 1.2s cubic-bezier(0.22, 0.84, 0.68, 1);

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
    animation: fadeUp 1.2s cubic-bezier(0.22, 0.84, 0.68, 1);

    @media screen and (min-width: 360px) {
      padding-bottom: 3rem;
    }
  }
}
</style>
