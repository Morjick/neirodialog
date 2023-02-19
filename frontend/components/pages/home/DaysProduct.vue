<template>
  <section class="days-product">
    <h3>Товар дня!</h3>
    <div class="days-product-inner">
      <NuxtLink :to="'/shop/' + daysProduct.href" class="days-product-item">
        <!-- <img :src="daysProduct.avatar.split('http').length > 1 ? daysProduct.avatar : 'http://localhost:8080/' + daysProduct.avatar" alt="" @error="helperImage"> -->
        <UiImage :url="daysProduct.avatar" />
      </NuxtLink>
      <NuxtLink :to="'/shop/' + daysProduct.href" class="days-product-desc">
        <div class="days-product-desc-inner">
          <div class="days-product-desc-title">{{ daysProduct.name }}</div>
          <div class="days-product-desc-body">{{ daysProduct.description }}</div>
          <div class="days-product-desc-button product-body standart-flex">
            <!-- <p class="days-product-desc-title">{{ daysProduct.price }}</p> -->
            <div class="product-price">
              <span v-if="daysProduct.discount > 0" class="product-old-price">{{ daysProduct.fixPrice | priceFilter }} &#8381;</span>
              <span class="product-new-price">{{ daysProduct.price | priceFilter }} &#8381;</span>
            </div>
            <!-- <UiButton 
              text="В корзину"
            /> -->
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script>
import UiButton from '~/components/ui/UiButton'
import UiImage from '~/components/ui/UiImage'

export default {
  name: 'DaysProduct',
  components: { UiButton, UiImage },
  props: {
    daysProduct: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      noImage: require('~/assets/img/not-avaibale.jpg')
    }
  },
  methods: {
    helperImage(e) {
      e.target.src = this.noImage
    }
  }
}
</script>
