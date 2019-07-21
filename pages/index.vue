<template>
  <main>
    <Hero />
    <Skills />
    <Projects />
  </main>
</template>

<script>
import Hero from "~/components/Hero";
import Skills from "~/components/Skills";
import Projects from "~/components/Projects";

export default {
  components: {
    Hero,
    Skills,
    Projects
  }
};
</script>

<style lang="scss" scoped>
</style>

