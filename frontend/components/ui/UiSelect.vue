<template>
  <section class="ui-select" :class="{ 'open': isOpen && modalOpen }">
    <div @click="openSelect" class="ui-select-header">
      <p>{{ activeElement[dataText] }}</p>
      <img src="~/assets/icons/arrow-down.png" alt="" />
    </div>
    <div class="ui-select-body">
      <div v-if="isSearch" class="ui-select-body-search">
        <img src="~/assets/icons/search.png" alt="" />
        <input type="search" :placeholder="placeholder" v-model="search" @input="searchSeller" />
      </div>
      <div class="ui-select-body-list">
        <div
          class="ui-select-body-item"
          v-for="item in list"
          :key="item[dataId]"
          @click="changeActiveElement(item)"
        >
          {{ item[dataText] }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UiPopover from "./UiPopover"
import { mapGetters } from 'vuex'

export default {
  name: "UiSelect",
  components: { UiPopover },
  props: {
    isSearch: {
      type: Boolean,
      default: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
    dataText: {
      type: String,
      default: "title",
    },
    dataId: {
      type: String,
      default: "id",
    },
    callback: {
      type: Function,
      default: () => {},
    },
    placeholder: {
      type: String,
      default: "Что ищем?",
    },
    defaultElement: {
      type: Object,
      default: () => {
        return {
          title: 'Не выбрано',
          id: 0,
          noClick: true
        }
      }
    }
  },
  data: () => ({
    activeElement: {},
    isOpen: false,
    search: '',
    debounceTimeount: null,
  }),
  methods: {
    changeActiveElement(element) {
      if (element.noClick || element[this.dataId] == this.activeElement[this.dataId]) return
      this.activeElement = element
      this.isOpen = false
      this.callback(element)
      this.$emit("changeElement", element)
    },
    openSelect() {
      this.isOpen = !this.isOpen
      this.$store.commit('app/setIsModal', this.isOpen)
    },
    async searchSeller () {
      if (this.debounceTimeount) {
        clearTimeout(this.debounceTimeount)
      }
      this.debounceTimeount = setTimeout(() => {
        this.$emit('searchSeller', this.search)
      }, 500)
    }
  },
  computed: {
    ...mapGetters('app', ['isModalOpen']),
    modalOpen() {
      if(!this.isModalOpen) this.isOpen = false
      return this.isModalOpen
    }
  },
  mounted() {
    this.activeElement = this.defaultElement
  }
}
</script>
