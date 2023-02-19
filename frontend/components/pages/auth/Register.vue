<template>
  <div class="login-component">
    <h3>Зарегистрироваться</h3>
    <p class="danger-color" v-if="errorMessage.length > 0">{{ errorMessage }}</p>
    <div class="input-container">
      <UiInput 
        placeholder="Как вас зовут" 
        @change="changeEmail"
      />
    </div>
    <div class="input-container">
      <UiInput 
        placeholder="Укажите свою почту" 
        @change="changeEmail"
      />
    </div>
    <div class="input-container">
      <UiInput
        placeholder="Придумайте пароль" 
        @change="changePassword"
        type="password"
      />
    </div>

    <div class="button-container button-container--right">
      <UiButton text="Войти" @click="singUp"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import UiInput from '~/components/ui/UiInput'
import UiButton from '~/components/ui/UiButton'

export default {
  name: 'Register',
  components: { UiInput, UiButton },
  data() {
    return {
      email: '',
      password: '',
      name: '',
      errorMessage: '',
    }
  },
  methods: {
    ...mapActions('auth', ['singup']),
    changeEmail(value) {
      this.email = value
    },
    changePassword(value) {
      this.password = value
    },
    changeName(value) {
      this.name = value
    },
    async singUp() {
      this.errorMessage = ''

      const res = await this.singup({
        email: this.email,
        password: this.password,
        name: this.name
      })
      if(res && res.length) {
        this.errorMessage = res
      }
    }
  },
}
</script>
