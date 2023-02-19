<template>
  <section>
    <h1>Магазин</h1>
    <p>Добро пожаловать в магазин. Здесь вы можете найти самые разные продукты нашего сервиса. Чтобы выбрать подходящий продукт, воспользуйтесь фильтрами или поиском</p>
    
    <FilterList 
      :filters="filters" 
      @changeFilters="getProducts" 
    />

    <div class="shop-body">
      <Product v-for="item in products" :key="item.id" :item="item" />
    </div>
    
  </section>
</template>

<script>
import FilterList from '~/components/pages/shop/FilterList'
import Product from '~/components/pages/home/Product'

export default {
  name: 'ShopPage',
  components: { Product, FilterList },
  async asyncData({ $axios, query }) {
    const filters = {}

    if(query.name) filters.name = query.name
    if(query.articul) filters.articul = query.articul
    if(query.minPrice) filters.minPrice = query.minPrice
    if(query.maxPrice) filters.maxPrice = query.maxPrice
    if(query.discount) filters.discount = query.discount
    if(query.photo) filters.photo = query.photo
    console.log(filters)

    const { data: products } = await $axios.get('product/get-many', {
      params: filters
    })
    return { products: products || products.products, filters }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    async getProducts(filters) {
      const { data: products } = await this.$axios.get('product/get-many', {
        params: filters
      })
      this.products = products
    },
  },
}
</script>
