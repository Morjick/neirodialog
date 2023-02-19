<template>
  <section class="ui-button"  :class="[ mod,, { 'disabled': disabled } ]">
    <button 
      class="ui-button-item"
      @click="emitClick"
    >{{ loading ? 'Загрузка...' : text  }}</button>
  </section>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    text: {
      type: String,
      default: 'Подтвердить'
    },
    mod: {
      type: String,
      default: 'primery'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
  }),
  methods: {
    emitClick() {
      if(this.disabled || this.loading) return
      this.$emit('click')
    }
  },
  mounted() {
  },
  // computed: {
  // }
}
</script>
