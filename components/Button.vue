<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss">
.button {
  font-size: 1.8rem;
  width: 100%;
  height: 5rem;
  color: $color-primary;
  background-color: transparent;
  border-radius: 5rem;
  border: 2px solid $color-primary;
  font-weight: 600;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &__link {
    width: 100%;

    @media screen and (min-width: $sm) {
      width: auto;
    }
  }
  &__link:focus button {
    background-color: $color-primary;
    color: $color-white;
  }

  & a {
    text-decoration: none;
    color: $color-primary;
  }

  &:hover,
  &:focus {
    background-color: $color-primary;
    color: $color-white;

    a {
      color: $color-white;
    }
  }

  &--active {
    background-color: $color-primary;
    color: $color-white;
  }

  &:disabled,
  &[disabled] {
    opacity: 0.4;

    &:hover {
      background-color: transparent;
      color: $color-primary;
      cursor: not-allowed;
    }
  }

  @media screen and (min-width: $sm) {
    width: 20rem;
  }
}
</style>
