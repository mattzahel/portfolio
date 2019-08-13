<template>
  <section class="services" id="services">
    <h2 class="headline">
      Freelance
      <span class="text-highlight">Services</span>
    </h2>
    <div
      class="services__wrapper container"
      data-aos="fade-up"
      data-aos-duration="1200"
      data-aos-once="true"
    >
      <div class="services__card">
        <h3 class="heading">
          Website graphic
          <span class="text-highlight">design</span>
        </h3>
        <ul>
          <li v-for="(item, index) in services.design" :key="index">
            <svg-icon name="check" width="1.5rem" height="1.5rem" />
            {{item}}
          </li>
        </ul>
      </div>
      <div class="services__card">
        <h3 class="heading">
          Static
          <span class="text-highlight">website</span> or SPA
        </h3>
        <ul>
          <li v-for="(item, index) in services.static" :key="index">
            <svg-icon name="check" width="1.5rem" height="1.5rem" />
            {{item}}
          </li>
        </ul>
      </div>
      <div class="services__card">
        <h3 class="heading">
          <span class="text-highlight">Blog</span> website (CMS)
        </h3>
        <ul>
          <li v-for="(item, index) in services.blog" :key="index">
            <svg-icon name="check" width="1.5rem" height="1.5rem" />
            {{item}}
          </li>
        </ul>
      </div>
      <nuxt-link to="#contact">
        <Button>Check pricing</Button>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
import Button from "~/components/Button";

export default {
  components: { Button },
  data() {
    return {
      services: {
        design: [
          "Desktop & mobile",
          "Unlimited pages",
          "Modern and clean",
          "Animations prototype",
          "Export in many formats"
        ],
        static: [
          "HTML/CSS/JS or Nuxt",
          "Custom or ready design",
          "Animations on scroll",
          "Fast and modern",
          "Google Analytics Implementation",
          "Progressive Web App",
          "1 month warranty"
        ],
        blog: [
          "Wordpress or Nuxt + DatoCMS",
          "Custom or ready template",
          "Animations on scroll",
          "Modern look",
          "Basic SEO configuration",
          "Google Analytics Implementation",
          "2 months warranty"
        ]
      }
    };
  }
};
</script>

<style lang="scss">
.services {
  padding: 10rem 0 5rem 0;
  min-height: 100vh;

  @media screen and (min-width: $md) {
    min-height: 80vh;
    padding: 10rem 0 10rem 0;

    h3 {
      text-align: center;
    }
  }
  &__wrapper {
    @media screen and (min-width: $md) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 1fr, 10rem;
      grid-gap: 1rem;
      justify-items: center;
    }

    a {
      grid-column: span 3;
    }
  }

  &__card {
    @include card-shadow;
    border-radius: 1rem;
    margin: 3rem 0;
    padding: 5rem 3rem;
    border: 2px solid transparent;
    transition: 0.2s ease-in-out;
    cursor: default;

    &:hover {
      border: 2px solid $color-primary;
    }

    & ul {
      list-style-type: none;
      font-size: 1.6rem;
      line-height: 1.6;
      color: $color-grey;

      @media screen and (min-width: $md) {
        line-height: 2.4;
      }

      li {
        display: flex;
        align-items: center;

        svg {
          margin-right: 1rem;
        }
      }
    }
  }
}
</style>
