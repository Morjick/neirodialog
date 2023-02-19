<template>
  <div @click="closeAllModal" class="popover" :class="{'no-click': !isOpenModal}"></div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Popover',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters('app', ['isModalOpen']),
    isOpenModal() {
      return this.isModalOpen
    }
  },
  methods: {
    closeAllModal() {
      this.$store.commit('app/setIsModal', false)
    }
  }
}
</script>
