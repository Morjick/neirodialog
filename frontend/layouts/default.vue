<template>
  <div class="default-layout">
    <Header />
    <div class="default-content">
      <Nuxt />
    </div>

    <Popover />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Header from '~/components/global/Header'
import Popover from '~/components/global/Popover'

export default {
  name: 'default',
  layout: 'default',
  components: { Header, Popover },
  data() {
    return {
      social: {}
    }
  },
  methods: {
    ...mapActions('auth', ['setLoginToken']),
    async getSocial() {
      const { data } = await this.$axios.get('social/get-social')
      
      this.social = data.social[0]
    },
    setIslogin() {
      const isLogin = this.$cookies.get('neirodialog-token')

      if(isLogin && isLogin.length) {
        this.setLoginToken(isLogin)
      }
    }
  },
  mounted() {
    this.getSocial()
    this.setIslogin()
  }
}
</script>
