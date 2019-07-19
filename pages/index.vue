<template>
  <Hero />
</template>

<script>
import gql from "graphql-tag";
import Hero from "~/components/Hero";
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
    Hero
  }
};
</script>

<style lang="scss" scoped>
</style>

