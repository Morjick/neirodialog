<template>
  <section class="auth-container flex justify-between align-center">
    <div class="auth-block">
      <Nuxt />
    </div>
    <div class="auth-image"></div>
  </section>
</template>

<script>
export default {
  name: 'AuthLayout',
  methods: {
  }
}
</script>

<style>
.auth-image {
  display: block;
  width: 50%;
  height: 100vh;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('~/assets/img/auth-image.jpg');

  box-shadow: 0 0 15px 2px #000;
}
</style>
