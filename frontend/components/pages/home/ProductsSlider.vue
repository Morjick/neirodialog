<template>
  <section class="products-slider">
    <div 
      class="products-slider-item products-slider-prev" 
      :class="{
        'products-slider-item__notactive': slide == 0
      }"
      @click="changeSlide('prev')"
    ></div>
    <Product v-for="item in product" :key="item.id" :item="item" :sliderTranslate="sliderTranslate" style="width: 330px" />
    <div 
      class="products-slider-item products-slider-next"
      :class="{
        'products-slider-item__notactive': slide >= product.length - 4
      }"
      @click="changeSlide('next')"
    ></div>
  </section>
</template>

<script>
import UiButton from '~/components/ui/UiButton'
import Product from './Product'

export default {
  name: 'ProductsSlider',
  components: { UiButton, Product },
  props: {
    product: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      slide: 0,
      sliderTranslate: 0,
      noImage: require('~/assets/img/not-avaibale.jpg')
    }
  },
  methods: {
    changeSlide (change) {
      if(change == 'prev') {
        if(this.slide - 1 < 0) return
        this.slide = this.slide - 1
        this.sliderTranslate = this.sliderTranslate + 360
      }

      if(change == 'next') {
        if(this.slide + 1 == this.product.length - 3) return
        this.slide = this.slide + 1
        this.sliderTranslate = this.sliderTranslate - 360
      }
    },
  }
}
</script>
