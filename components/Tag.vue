<template>
  <div class="tag">
    <slot name="icon"></slot>
    <slot name="name"></slot>
  </div>
</template>

<style lang="scss">
.tag {
  background-color: #f3f3f3;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0rem 1rem 1rem 0;

  @media screen and (min-width: $md) {
    font-size: 1.6rem;
  }

  svg {
    margin-right: 0.5rem;
  }
}
</style>
