<template>
  <div class="auth-page">
    <div class="auth-component">
      <div class="auth-page-header">
        <div 
          :class="{
            'auth-page-header-button--active': tab == 'login'
          }" 
          class="auth-page-header-button"
          @click="changeComponent('login')"
        >Авторизация</div>
        <div 
          :class="{
            'auth-page-header-button--active': tab == 'register'
          }"
          class="auth-page-header-button"
          @click="changeComponent('register')"
        >Регистрация</div>
      </div>
      <Login v-if="tab == 'login'" />
      <Register v-if="tab == 'register'" />
    </div>
  </div>
</template>

<script>
import Login from '~/components/pages/auth/Login'
import Register from '~/components/pages/auth/Register'

export default {
  name: 'auth',
  middleware: ['auntification'],
  components: { Login, Register },
  data() {
    return {
      tab: 'login',
    }
  },
  methods: {
    changeComponent(component) {
      this.tab = component
    }
  }
}
</script>
