<template>
  <section>
    <section class="shop-filter-list">
      <UiInput v-if="!banned.includes('name')" placeholder="Поиск по названию" @change="searchName" style="width: 49%" />
      <UiInput v-if="!banned.includes('articul')" placeholder="Поиск по артикулю" @change="searchArticul" style="width: 49%" />
      <div style="width: 49%;" class="d-flex space-between">
        <UiSumRange @changeSum="changeSum" />
        <UiSelect :list="sellers" @searchSeller="searchSeller" />
      </div>
      <UiSelect :list="types" :isSearch="false" :defaultElement="{ id: 3, title: 'Ве товары' }" />
      <div class="only-discount">
        <input 
          id="discount" 
          type="checkbox" 
          v-model="filters.discount"
          @change="getProducts"
        >
        <label for="discount">Только со скидкой</label>
      </div>
      <div class="only-discount">
        <input 
          id="photo" 
          type="checkbox" 
          v-model="filters.photo"
          @change="getProducts"
        >
        <label for="photo">Только с фото</label>
      </div>
      <div class="reset-filter">
        <button @click="resetFilter">Сбросить фильтры</button>
      </div>
    </section>
  </section>
</template>

<script>
import UiInput from '~/components/ui/UiInput'
import UiSumRange from '~/components/ui/UiSumRange'
import UiSelect from '~/components/ui/UiSelect'

export default {
  name: 'FilterList',
  commponents: { UiInput, UiSumRange, UiSelect },
  props: {
    filters: {
      type: Object,
      default: {
        name: null,
        articul: null,
        minPrice: null,
        maxPrice: null,
        discount: false,
        photo: false,
      }
    },
    banned: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    ebounceTimeount: null,
    sellers: [
      {id: 1, title: 'Неиродиалог'}, 
      {id: 2, title: 'Не Неиродиалог'}, 
      {id: 3, title: 'Не Неиродиалог, а фирма с ооооочень длинным нахванием'}
    ],
    types: [
      { id: 1, title: 'Физический товар' },
      { id: 2, title: 'Электронный товар' },
      { id: 3, title: 'Ве товары' },
    ]
  }),
  methods: {
    getProducts() {
      const filters = {}

      if(this.filters.name) filters.name = this.filters.name
      if(this.filters.articul) filters.articul = this.filters.articul
      if(this.filters.minPrice) filters.minPrice = this.filters.minPrice
      if(this.filters.maxPrice) filters.maxPrice = this.filters.maxPrice
      if(this.filters.discount) filters.discount = this.filters.discount
      if(this.filters.photo) filters.photo = this.filters.photo

      this.$router.push({
        query: filters
      })
      this.$emit('changeFilters', filters)
    },
    searchName(value) {
      if (this.debounceTimeount) {
        clearTimeout(this.debounceTimeount)
      }
      this.debounceTimeount = setTimeout(() => {
        this.filters.name = value
        this.getProducts()
      }, 500)
    },
    searchArticul(value) {
      if (this.debounceTimeount) {
        clearTimeout(this.debounceTimeount)
      }
      this.debounceTimeount = setTimeout(() => {
        this.filters.articul = value
      }, 500)
    },
    changeSum(sum) {
      this.filters.minPrice = sum.min
      this.filters.maxPrice = sum.max

      this.getProducts()
    },
    async searchSeller (value) {
      try {
        const { data } = await this.$axios.get(`product/get-many?sellerName=${value}`)

        // this.sellers = data
      } catch (e) {
        console.log(e)
        this.openSelect()
      }
    },
    async emitFilter () {
      const { data } = await this.$axios.get(`product/get-many?name=${this.filters.name}`)
    },
    resetFilter () {
      this.filters = {
        name: null,
        articul: null,
        minPrice: null,
        maxPrice: null,
        discount: false,
        photo: false,
      }

      this.getProducts()
    }
  },
}
</script>
