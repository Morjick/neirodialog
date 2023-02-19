<template>
  <section class="ui-input-section" :class="{ 
    mod,
    'ui-input-error': !valid
  }">
    <span v-if="!valid" class="ui-input-error-text">{{ errorText }}</span>
    <label class="ui-input" :for="randomId">
      <input 
        :type="inputType" 
        :placeholder="placeholder"
        v-model="value"
        :id="randomId"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        :name="name"
      >
      <span v-if="label.length > 0">{{ label }}</span>
    </label>
  </section>
</template>

<script>
import defaultVue from '../../layouts/default.vue'
export default {
  name: 'UiInput',
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    validations: {
      type: Object,
      default: () => {}
    },
    mod: {
      type: String,
      default: 'medium'
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data: () => ({
    // value: '',
    errorText: '',
  }),
  methods: {
  },
  mounted() {
  },
  computed: {
    valid() {
      this.errorText = ''

      if(this.validations?.required && !this.value.length) {
        this.errorText = 'Это поле обязательно'
        return false
      }

      if(this.validations?.minLength && this.value.length < this.validations?.minLength) {
        this.errorText = `Поле должно быть не короче ${this.validations?.minLength} символов`
        return false
      }

      if(this.validations?.maxLength && this.value.length < this.validations?.maxLength) {
        this.errorText = `Поле должно быть не длиннее ${this.validations?.maxLength} символов`
        return false
      }

      if(this.validations?.isNumber && (Number(this.value) || Number(this.value) == NaN)) {
        this.errorText = `Поле должно содержать только цифры`
        return false
      }

      if(!this.validations) return true

      return true
    },
    randomId() {
      return this.$radnomId()
    }
  }
}
</script>
