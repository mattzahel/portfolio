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
        >Designs</Button>
      </div>
    </div>
    <div class="projects__cards container">
      <div
        class="projects__item"
        v-for="item in allProjects"
        :key="item.id"
        v-if="item.projectType == type"
      >{{item.title}}</div>
    </div>
  </section>
</template>

<script>
import gql from "graphql-tag";
import Button from "~/components/Button";

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
          }
        }
      }
    `
  },
  components: { Button },
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
  height: 100vh;
  padding-top: 10rem;
  background-color: $bg-grey;

  &__buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 0.5rem;
    margin: 3rem auto;
    justify-items: center;
  }
}
</style>
