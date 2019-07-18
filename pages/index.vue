<template>
  <section class="hero"></section>
</template>

<script>
import gql from "graphql-tag";

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
  components: {}
};
</script>

<style lang="scss" scoped>
.hero {
  height: 200vh;
  background-color: $bg-grey;
}
</style>

