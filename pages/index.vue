<template>
  <main>
    <Hero />
    <Skills />
  </main>
</template>

<script>
import gql from "graphql-tag";
import Hero from "~/components/Hero";
import Skills from "~/components/Skills";
export default {
  // apollo: {
  //   allProjects: gql`
  //     query {
  //       allProjects {
  //         id
  //         title
  //         description
  //         slug
  //         tags
  //         thumbnail {
  //           url
  //         }
  //       }
  //     }
  //   `
  // },
  data() {
    return {
      allProjects: []
    };
  },
  components: {
    Hero,
    Skills
  }
};
</script>

<style lang="scss" scoped>
</style>

