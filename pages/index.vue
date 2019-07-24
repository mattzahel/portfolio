<template>
  <main>
    <Hero />
    <Skills />
    <Projects />
    <Services />
    <Contact />
  </main>
</template>

<script>
import Hero from "~/components/Hero";
import Skills from "~/components/Skills";
import Projects from "~/components/Projects";
import Contact from "~/components/Contact";
import Services from "~/components/Services";

export default {
  components: {
    Hero,
    Skills,
    Projects,
    Contact,
    Services
  }
};
</script>

<style lang="scss" scoped>
</style>

