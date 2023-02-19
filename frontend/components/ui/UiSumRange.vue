<template>
  <section class="ui-summ-range">
    <input 
      type="text" 
      placeholder="от"
      v-model="min"
      @input="changeSumm('min')"
    >
    <input 
      type="text" 
      placeholder="до"
      v-model="max" 
      @input="changeSumm('max')"
    >
  </section>
</template>

<script>
export default {
  name: 'UiSumRange',
  components: {  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1000000
    },
  },
  data: () => ({
    debounceTimeount: null
  }),
  methods: {
    changeSumm(field) {
      this[field] = this[field].replace(/\D/g, '')
      
      if (this.debounceTimeount) {
        clearTimeout(this.debounceTimeount)
      }
      this.debounceTimeount = setTimeout(() => {
        const sum = {
          min: Number(this.min),
          max: Number(this.max),
        }
        
        this.$emit('changeSum', sum)
      }, 500)
    }
  },
}
</script>
