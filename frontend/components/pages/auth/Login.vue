<template>
  <div class="login-component">
    <h3>Войти</h3>
    <p class="danger-color" v-if="errorMessage.length > 0">{{ errorMessage }}</p>
    <div class="input-container">
      <UiInput 
        placeholder="Введите свой логин" 
        @change="changeEmail"
      />
    </div>
    <div class="input-container">
      <UiInput
        placeholder="Введите свой пароль" 
        @change="changePassword"
        type="password"
      />
    </div>

    <div class="button-container button-container--right">
      <UiButton text="Войти" @click="singIn"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import UiInput from '~/components/ui/UiInput'
import UiButton from '~/components/ui/UiButton'

export default {
  name: 'Login',
  components: { UiInput, UiButton },
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    }
  },
  methods: {
    ...mapActions('auth', ['singin']),
    changeEmail(value) {
      this.email = value
    },
    changePassword(value) {
      this.password = value
    },
    async singIn() {
      this.errorMessage = ''

      const res = await this.singin({
        email: this.email,
        password: this.password
      })
      if(res && res.length) {
        this.errorMessage = res
      }
    }
  },
}
</script>
