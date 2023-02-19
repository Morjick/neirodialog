<template>
  <section class="good-day">
    <p>{{ name ? `Добро пожаловать, ${name || helperName}!` : `Добро пожаловать, у вас не указано имя пользователя. Для более корректной работы в Админ-панели, укажите имя.` }}</p>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'GoodDay',
  props: {
  },
  data: () => ({
    helperName: ''
  }),
  methods: {
  },
  mounted() {
    setTimeout(() => this.helperName = localStorage.getItem('name'), 0)
  },
  computed: {
    ...mapGetters('app', ['getName']),
    name() {
      return this.getName
    }
  }
}
</script>
