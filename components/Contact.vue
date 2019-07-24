<template>
  <section class="contact" id="contact">
    <h2 class="headline">
      <span class="text-highlight">Contact me</span>
    </h2>
    <div class="container">
      <form
        class="contact__form"
        name="contact"
        netlify
        method="post"
        netlify-honeypot="bot-field"
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-once="true"
      >
        <input type="hidden" name="contact" value="contact" />
        <p class="contact__hidden">
          <label>
            Don’t fill this out:
            <input name="bot-field" />
          </label>
        </p>
        <div class="contact__group">
          <label class="form-label" for="name">Name</label>
          <input type="text" class="form-field" name="name" id="name" required />
        </div>
        <div class="contact__group">
          <label class="form-label" for="email">Email</label>
          <input type="email" class="form-field" name="email" id="email" required />
        </div>
        <div class="contact__group">
          <label class="form-label" for="message">Message</label>
          <textarea class="form-field" name="message" id="message" required></textarea>
        </div>
        <input class="button" type="submit" value="Send message" />
      </form>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss">
.contact {
  min-height: 80vh;
  padding: 10rem 0 5rem 0;
  background-image: url("/hero_bg.png");
  background-size: cover;
  background-position: bottom center;
  background-color: $bg-grey;

  &__form {
    margin-bottom: 2.5rem;
  }

  &__hidden {
    display: none;
  }

  &__group {
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5rem;

    & label {
      font-size: 1.8rem;
      font-weight: 600;
      color: $color-grey;
      margin-bottom: 0.5rem;
    }

    & input,
    & textarea {
      width: 100%;
      font-size: 1.8rem;
      color: $color-secondary;
      padding: 1rem;
      border: none;
      border-bottom: 2px solid $color-primary;
      background-color: $bg-grey;
      outline-color: $color-primary;
    }
    & textarea {
      font-family: "Open Sans", sans-serif;
      min-height: 20rem;
      resize: none;
    }
  }
}
</style>
