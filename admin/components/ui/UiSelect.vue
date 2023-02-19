<template>
  <section class="ui-select" :class="{ '__open-ui-select': isOpen }">
    <div class="ui-select-header" @click="toggleOpen">{{ acvieElement[textValue] || defaultValue }}</div>
    <ul class="ui-select-body">
      <input 
        type="text"
        v-bind:value="value"
        v-on:change="eventElement"
        v-on:input="eventElement"
      >
      <li 
        class="ui-select-item"
        v-for="item in list"
        :key="item[idValue]"
        @click="changeActiveElement(item)"
      >{{ item[textValue] }}</li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'UiSelect',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    defaultValue: {
      type: [String, Number],
      default: 'Не выбрано'
    },
    textValue: {
      type: String,
      default: 'title'
    },
    idValue: {
      type: String,
      default: 'id'
    }
  },
  data: () => ({
    value: '',
    acvieElement: {},
    isOpen: false
  }),
  computed: {
  },
  methods: {
    changeActiveElement(element) {
      this.acvieElement = element
      this.value = element[this.idValue]
      // this.$emit('input', this.value)
      this.eventElement()
      this.toggleOpen()
    },
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    eventElement() {
      this.$emit('input', this.value)
      this.$emit('change', this.value)
    }
  },
  mounted() {
  },
}
</script>
