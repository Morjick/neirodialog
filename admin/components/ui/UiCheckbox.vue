<template>
  <section class="ui-checkbox">
    <label>
      <div class="ui-checkbox-item" :class="{ 'ui-checkbox-item--checked' : value}">
        <input 
          type="checkbox" 
          v-model="value" 
          v-bind:value="value"
          v-on:input="$emit('input', value)"
          v-on:change="$emit('input', value)"
        >
      </div>
      <p class="ui-checkbox-label">{{ label }}</p>
    </label>
  </section>
</template>

<script>
export default {
  name: 'UiCheckbox',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Подтвердить действие'
    }
  },
  data: () => ({
    value: false,
  }),
  computed: {
  },
  methods: {
  },
  mounted() {
  },
}
</script>
