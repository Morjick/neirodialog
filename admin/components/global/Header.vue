<template>
  <section class="content-header">
    <header class="content-header-inner">
      <ui-button 
        text="Выйти"
        @click="singout"
        style="margin-left: auto;"
      />
    </header>
  </section>
</template>

<script>
import UiButton from '../ui/UiButton.vue'
export default {
  components: { UiButton },
  name: 'Header',
  props: {
  },
  data: () => ({
  }),
  methods: {
    singout() {
      this.$cookies.remove('admin-token')
      this.$router.push('/auth')
    }
  },
  mounted() {
  },
  computed: {
  }
} 
</script>