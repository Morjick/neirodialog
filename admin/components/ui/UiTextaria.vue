<template>
  <section class="ui-textaria" :class="{ 'ui-textaria--error': invalid }">
    <span v-if="invalid">{{ errorText }}</span>
    <textarea
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
      :placeholder="placeholder"
    ></textarea>
  </section>
</template>

<script>
export default {
  name: 'UiTextaria',
  props: {
    errorText: {
      type: String,
      default: 'Ошибка при заполнения поля'
    },
    invalid: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    value: ''
  }),
  computed: {
  },
  methods: {
  },
  mounted() {
  },
}
</script>
