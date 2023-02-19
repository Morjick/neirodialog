<template>
  <div 
    class="ui-input"
    :style="{ 
      width: `calc(${width})`, 
      height: `calc(${height})`
    }" 
  >
    <input 
      @input="emitValue" 
      :placeholder="placeholder"
      v-model="value" 
      :type="type"
    >
  </div>
</template>

<script>
export default {
  name: 'UiInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '40px'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    emitValue() {
      this.$emit('change', this.value)
    }
  }
}
</script>
