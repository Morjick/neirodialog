<template>
  <section class="auth-page">
    <h1 class="margin-20-0">Вход в систему</h1>
    <p v-if="errorText && errorText.length > 0" class="validation-error">{{ errorText }}</p>
    <ui-input 
      placeholder="Введите свой Email"
      label="Email"
      v-model="login"
      style="margin: 30px 0;"
      name="email"
    />
    <ui-input 
      placeholder="Введите свой пароль"
      label="Пароль"
      v-model="password"
      name="password"
      inputType="password"
    />
    <div class="btn-container right" style="margin-lfet: auto;">
      <ui-button 
        text="Забыл пароль"
        mod="outline"
        @click="forgot"
      />
      <ui-button 
        @click="singin"
        :loading="loading"
      />
    </div>
  </section>
</template>

<script>
import UiInput from '~/components/ui/UiInput.vue'
import UiButton from '~/components/ui/UiButton.vue'

import { mapMutations } from 'vuex'

export default {
  components: { UiInput, UiButton },
  layout: 'auth',
  name: 'AuthPage',
  middleware: ['not-auth'],
  data: () => ({
    login: '',
    password: '',
    loading: false,
    errorText: ''
  }),
  methods: {
    ...mapMutations('app', ['setAdminData']),
    async singin() {
      this.loading = true
      try {
        const res = await this.$axios.post('users/sing-in', {
          email: this.login,
          password: this.password
        })
        const data = res.data

        const token = data.token
        localStorage.setItem('admin-token', token)
        localStorage.setItem('permissons', data.permissons)
        localStorage.setItem('name', data.name)
        this.$cookies.set('admin-token', token)
        this.$cookies.set('admin-permissons', data.permissons)
        this.$cookies.set('name', data.name)

        this.setAdminData({token, permissons: data.permissons, name: data.name})
        
        this.loading = false

        this.$router.push('/') 
      } catch(e) {
        console.warn(e.response?.data?.message)
        this.errorText = e.response?.data?.message && Array.isArray(e.response?.data?.message) ? e.response?.data?.message[0] : e.response?.data?.message
        this.loading = false
      }
    },
    forgot() {
      console.log('forgot')
    }
  },
  mounted() {
  },
}
</script>
