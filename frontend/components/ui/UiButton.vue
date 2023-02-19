<template>
  <div @click="clicker" class="ui-button" :class="[plygin, size]">
    <button>{{ text }}</button>
  </div>
</template>

<script>
export default {
  name: 'UiButton',
  props: {
    text: {
      type: String,
      default: 'Принять'
    },
    size: {
      type: String,
      default: 'medium'
    },
    plygin: {
      type: String,
      default: 'primery'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    clicker() {
      this.$emit('click')
    }
  }
}
</script>
