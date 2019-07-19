<template>
  <button class="action-button">
    <slot></slot>
  </button>
</template>

<script>
export default {};
</script>

<style lang="scss">
.action-button {
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

  &:hover,
  &:focus {
    background-color: $color-primary;
    color: $color-white;
  }

  @media screen and (min-width: $sm) {
    width: 20rem;
  }
}
</style>
