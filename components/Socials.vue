<template>
  <div class="socials">
    <div class="socials__wrapper">
      <svg-icon name="github" class="socials__icon" title="Github" />
    </div>
    <div class="socials__wrapper">
      <svg-icon name="linkedin" class="socials__icon" title="Linked In" />
    </div>
    <div class="socials__wrapper">
      <svg-icon name="instagram" class="socials__icon" title="Instagram" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.socials {
  margin: 2rem 0;
  display: flex;

  &__wrapper {
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
}
</style>
