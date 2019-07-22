<template>
  <div class="socials">
    <a href="https://github.com/mattzahel" target="_blank" class="socials__link">
      <svg-icon name="github" class="socials__icon" title="Github" />
    </a>
    <a href="https://www.linkedin.com/in/mateusz-zahel" target="_blank" class="socials__link">
      <svg-icon name="linkedin" class="socials__icon" title="Linked In" />
    </a>
    <a href="https://www.instagram.com/mattzahel/" target="_blank" class="socials__link">
      <svg-icon name="instagram" class="socials__icon" title="Instagram" />
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.socials {
  margin: 2rem 0;
  display: flex;

  &__link {
    width: 6rem;
    height: 6rem;
    padding: 1.5rem;
    border: 2px solid $color-primary;
    border-radius: 50%;
    margin: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      background-color: $color-primary;
    }

    &:hover .socials__icon {
      color: $color-white;
    }
  }
  &__icon {
    width: 3rem;
    height: 3rem;
    color: $color-primary;
  }

  &--light &__link {
    border: 2px solid $color-white;

    &:hover {
      background-color: $color-white;
    }

    &:hover .socials__icon {
      color: $color-primary;
    }
  }
  &--light &__icon {
    color: $color-white;
  }
}
</style>
