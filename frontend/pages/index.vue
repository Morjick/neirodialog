<template>
  <div class="home-page">
    <h1>Добро пожаловать на Неиродиалог!</h1>

    <ProductsSlider :product="product" />
    <AuthPromo />
    <HomeDelivery />
    <AboutJob />
    <DaysProduct :daysProduct="daysProduct" />
  </div>
</template>

<script>
import ProductsSlider from '../components/pages/home/ProductsSlider'
import AuthPromo from '../components/pages/home/AuthPromo'
import HomeDelivery from '../components/pages/home/Delivery'
import AboutJob from '../components/pages/home/AboutJob'
import DaysProduct from '../components/pages/home/DaysProduct'

export default {
  name: 'HomePage',
  components: { ProductsSlider, AuthPromo, HomeDelivery, AboutJob, DaysProduct },
  async asyncData({ $axios }) {
    const product = await $axios('product/get-many')
    const { data: daysProduct } = await $axios.get('product/get-days-product')

    return { product: product.data, daysProduct }
  },
  data() {
    return {

    }
  },
}
</script>
