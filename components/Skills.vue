<template>
  <section class="skills" id="skills">
    <div class="skills__heading container">
      <h2 class="headline">
        Some of my
        <span class="text-highlight">skills</span>
      </h2>
      <p class="subheading">
        I design and implement responsive websites. I focus on aesthetics and try to write clean code.
        <br />I like to constantly learn new technologies, tools, I have good communication skills, and I am open to constructive criticism.
      </p>
    </div>
    <div class="skills__card">
      <div class="skills__section">
        <h3 class="heading">
          <span class="text-highlight">Frontend</span> Development
        </h3>
        <p class="subheading">
          Specialization. I create user-friendly responsive websites, I stick to popular methodologies such as BEM, and I have basic knowledge of both
          CSS and JS frameworks
        </p>
        <ul class="skills__list">
          <li v-for="skill in frontend" class="skills__item">{{skill}}</li>
        </ul>
      </div>
      <div class="skills__section">
        <h3 class="heading">Backend and other technologies</h3>
        <p
          class="subheading"
        >I have a basic knowledge of backend development, I use tools such as Git, NPM or Gulp on a daily basis</p>
        <ul class="skills__list">
          <li v-for="skill in others" class="skills__item">{{skill}}</li>
        </ul>
      </div>
      <div class="skills__section">
        <h3 class="heading">Design</h3>
        <p class="subheading">
          I love minimalism, I focus on aesthetics and good UX.
          I use mostly Photoshop, Adobe XD
        </p>
        <ul class="skills__list">
          <li v-for="skill in design" class="skills__item">{{skill}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      frontend: [
        "HTML5 and CSS3",
        "Semantics",
        "JavaScript (ES6)",
        "Responsive Web Design",
        "Mobile-first",
        "BEM methodology",
        "SCSS preprocessor",
        "Vue, Vuex",
        "Nuxt"
      ],
      others: [
        "PHP",
        "MySQL",
        "Wordpress",
        "GIT, Github",
        "NPM",
        "Gulp",
        "Firebase"
      ],
      design: ["Photoshop", "Adobe XD", "Figma"]
    };
  }
};
</script>

<style lang="scss">
.skills {
  padding-top: 7.5rem;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $md) {
    height: auto;
  }

  @media screen and (min-width: $lg) {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  &__heading {
    width: 100%;
    text-align: center;
  }

  &__card {
    @include card-shadow;
    border-radius: 1rem;
    margin: 2rem;
    padding: 2rem;

    @media screen and (min-width: $md) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 3rem;
      margin: 2rem;

      h3,
      p {
        text-align: center;
      }
    }
    @media screen and (min-width: $lg) {
      max-width: 90%;
      margin: 2rem auto;
      padding: 6rem 3rem;
    }
  }
  &__list {
    list-style-type: none;
    padding: 0;
    line-height: 2;
  }
  &__item {
    font-size: 1.8rem;
    color: $color-secondary;
    margin-left: 3rem;
    position: relative;

    @media screen and (min-width: $md) {
      margin-left: 10rem;
    }

    @media screen and (min-width: $lg) {
      margin-left: 15rem;
    }

    &::before {
      content: "";
      width: 1.5rem;
      height: 3px;
      background-color: $color-primary;
      position: absolute;
      left: -3rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
