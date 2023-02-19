<template>
  <section v-if="!islogin" class="full-screen-section">
    <div class="auth-promo">
      <div class="auth-promo-text">-10% На первую пакупку зарегистрированным пользователям</div>
      <UiButton text="Зарегистрироваться" @click="pushToAuth" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import UiButton from '~/components/ui/UiButton'

export default {
  name: 'AuthPromo',
  components: { UiButton },
  methods: {
   pushToAuth() {
    this.$router.push('/auth')
   }
  },
  computed: {
    ...mapGetters('auth', ['isLogin']),
    islogin() {
      return this.isLogin
    }
  }
}
</script>
