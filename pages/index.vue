<template>
  <main>
    <Hero />
    <Skills />
    <Projects />
    <Contact />
  </main>
</template>

<script>
import Hero from "~/components/Hero";
import Skills from "~/components/Skills";
import Projects from "~/components/Projects";
import Contact from "~/components/Contact";

export default {
  components: {
    Hero,
    Skills,
    Projects,
    Contact
  }
};
</script>

<style lang="scss" scoped>
</style>

