<template>
  <section>
    <good-day />
  </section>
</template>

<script>
import GoodDay from '../components/pages/home/GoodDay.vue'
import UiButton from '../components/ui/UiButton.vue'
export default {
  components: { UiButton, GoodDay },
  name: 'IndexPage',
  middleware: ['auth'],
  methods: {
    
  }
}
</script>
