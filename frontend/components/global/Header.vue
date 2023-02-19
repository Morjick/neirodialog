<template>
  <header class="header">
    <div class="header-inner">
      <p class="header-logo">Неиродиалог</p>
      <UiInput 
        width="300px" 
        placeholder="Что-то ищем?" 
        @change="logger" 
      />
      <nav class="header-navigation">
        <ui class="header-navigation-inner">
          <li class="header-navigation-inner-item" v-for="item in menu" :key="item.id">
            <NuxtLink v-if="item.href" :to="item.href">{{ item.title }}</NuxtLink>
            <ui v-if="item.submenu" class="header-navigation-submenu">
              <li v-for="submenu in item.submenu" :key="submenu.id" class="header-navigation-submenu-item">
                <NuxtLink :to="submenu.href">{{ submenu.title }}</NuxtLink>
              </li>
            </ui>
          </li>
        </ui>
      </nav>
      <UiButton v-if="!islogin" text="Войти" @click="pushToLogin" />
      <UiButton v-if="islogin" text="Выйти" plygin="cool" @click="singout" />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'

import UiInput from '~/components/ui/UiInput'
import UiButton from '~/components/ui/UiButton'

export default {
  name: 'DefaultHeader',
  components: { UiInput, UiButton },
  computed: {
    ...mapGetters('app', ['getMenu']),
    ...mapGetters('auth', ['isLogin']),
    menu() {
      return this.getMenu
    },
    islogin() {
      // setInterval(() => console.log(this.isLogin), 1000)
      return this.isLogin
    }
  },
  data() {
    return {
      value: '',
    }
  },
  methods: {
    logger (value) {
      this.value = value
    },
    pushToLogin() {
      this.$router.push('/auth')
    },
    singout() {
      console.log('singout')
    }
  },
}
</script>
