<template>
  <section class="projects" id="projects">
    <div class="projects__heading">
      <h2 class="headline">
        Selected
        <span class="text-highlight">projects</span>
      </h2>
      <div class="projects__buttons container">
        <Button
          @click.native="changeProjects('website')"
          :class="{'button--active' : type=='website'}"
        >Websites</Button>
        <Button @click.native="changeProjects('app')" :class="{'button--active' : type=='app'}">Apps</Button>
        <Button
          @click.native="changeProjects('design')"
          :class="{'button--active' : type=='design'}"
          disabled
        >Designs</Button>
      </div>
    </div>
    <div class="projects__cards container">
      <div
        class="projects__item"
        v-for="item in allProjects"
        :key="item.id"
        v-if="item.projectType == type"
        data-aos="fade-right"
        data-aos-duration="1200"
        data-aos-once="true"
      >
        <div class="projects__image">
          <img :src="item.thumbnail.url" :alt="item.thumbnail.alt" />
        </div>

        <div class="projects__description">
          <div>
            <h3 class="heading">{{item.title}}</h3>
            <p class="subheading">{{item.description}}</p>
            <div class="projects__tags">
              <Tag :class="tag" v-for="(tag, index) in item.tags" :key="index">
                <svg-icon slot="icon" :name="tag" width="1.5rem" height="1.5rem" />
                <span slot="name">{{tag}}</span>
              </Tag>
            </div>
          </div>
          <div class="projects__links">
            <a :href="item.live" v-if="item.live" target="_blank">
              <svg-icon name="live" width="1.5rem" height="1.5rem" />Live
            </a>
            <a :href="item.github" v-if="item.github" target="_blank">
              <svg-icon name="github" width="1.5rem" height="1.5rem" />Github
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import gql from "graphql-tag";
import Button from "~/components/Button";
import Tag from "~/components/Tag";
export default {
  apollo: {
    allProjects: gql`
      query {
        allProjects {
          id
          title
          description
          slug
          tags
          projectType
          live
          github
          thumbnail {
            url
            alt
          }
        }
      }
    `
  },
  components: { Button, Tag },
  data() {
    return {
      type: "website"
    };
  },
  methods: {
    changeProjects(param) {
      this.type = param;
    }
  }
};
</script>

<style lang="scss">
.projects {
  position: static;
  min-height: 100vh;
  padding-top: 10rem;
  padding-bottom: 2.5rem;
  background-color: $bg-grey;

  &__item {
    @include card-shadow;
    border-radius: 1rem;
    margin: 3rem 0;
    width: 100%;
    height: auto;
    padding: 0.5rem 1.5rem 2rem 1.5rem;
    background-color: $color-white;
    display: flex;
  }

  &__image img {
    display: none;

    @media screen and (min-width: $md) {
      display: block;
      max-height: 30rem;
    }
  }

  &__buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 0.5rem;
    margin: 3rem auto;
    justify-items: center;
    @media screen and (min-width: $md) {
      max-width: 70rem;

      & button {
        width: 100%;
      }
    }
  }
  &__description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &__links {
    padding: 0.5rem 0;
    margin-top: 1rem;

    @media screen and (min-width: $md) {
      margin-bottom: 2rem;
    }

    a {
      text-decoration: none;
      font-size: 1.8rem;
      color: $color-primary;
      margin-right: 3rem;
      font-weight: 600;
      transition: 0.3s ease-in-out;

      & svg {
        margin-right: 0.5rem;
      }
      &:hover {
        color: $color-grey;
      }
    }
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;

    .html5 {
      background-color: rgb(255, 224, 215);
      color: #e54c21;
    }
    .css3 {
      background-color: #c2e7fd;
      color: #1b73ba;
    }
    .vue,
    .nuxt {
      background-color: #dcf2e8;
      color: #1fbe77;
    }
    .vuetify {
      background-color: #d5eeff;
      color: #1397f6;
    }
    .graphql {
      background-color: #fce6f5;
      color: #e535ab;
    }
    .scss {
      background-color: #f6e3ec;
      color: #cd6799;
    }
    .nodejs {
      background-color: #e4f3dd;
      color: #6bbf47;
    }
    .express {
      color: #161615;
    }
    .mongodb {
      background-color: rgb(220, 250, 216);
      color: #4faa41;
    }
    .php {
      background-color: #ddeaff;
      color: #6082bb;
    }
    .firebase {
      background-color: #fff5d8;
      color: #f3a600;
    }
    .react {
      background-color: #dbf7fe;
      color: #00c8ff;
    }
    .bootstrap {
      background-color: #efebf6;
      color: #7952b3;
    }
    .wordpress {
      background-color: #e3f0f6;
      color: #0073aa;
    }
    .mysql {
      background-color: #c1effb;
      color: #1f7c95;
    }
    .laravel {
      background-color: #ffdedc;
      color: #f4493f;
    }
    .javascript {
      background-color: #faf4d2;
      color: #f0cc00;
    }
    .jquery {
      background-color: #d4edff;
      color: #0868ac;
    }
    .gulp {
      background-color: #fdd0d1;
      color: #db4446;
    }
    .adobeXD {
      background-color: #ffcfee;
      color: #2e041f;
    }
    .photoshop {
      background-color: #e1efff;
      color: #84bdfb;
    }
    .illustrator {
      background-color: #fbe1bf;
      color: #ffa733;
    }
    .typescript {
      background-color: #d2edff;
      color: #007acc;
    }
    .api,
    .pwa {
      color: $color-secondary;
    }
  }
}
</style>
