<template>
  <NuxtLink
      :to="'/shop/' + item.href"
      class="product"
      :style="`transform: translateX(${sliderTranslate}px);`"
    >
      <div class="product-head">
        <div class="product-header">
          <span v-if="item.discount > 0" class="product-discout"
            >-{{ item.discount }}%</span
          >
          <span v-if="item.rating" class="product-raiting"
            >Оценка: {{ item.rating }}</span
          >
        </div>
        <img
          :src="
            item.avatar?.split('http').length > 1
              ? item.avatar
              : 'http://localhost:8080/' + item.avatar
          "
          alt=""
          @error="helperImage"
        />
      </div>
      <div class="product-body">
        <div class="product-srm-info">
          <span class="product-type">{{ item.type }}</span>
          <span class="product-articul">{{ item.articule }}</span>
        </div>
        <span class="product-diller">{{ item.sellerName }}</span>
        <div class="product-body-target">
          <span>В наличии:</span>
          <span>{{ item.stock }} шт.</span>
        </div>
        <div
          v-if="item.color"
          class="d-flex space-between align-center"
          style="margin: 10px 0"
        >
          <span>Основной цвет: </span>
          <div
            :style="`background-color:${item.color}`"
            class="product-color"
          ></div>
        </div>
        <p class="product-name">{{ item.name }}</p>

        <div class="product-price">
          <span v-if="item.discount > 0" class="product-old-price"
            >{{ item.fixPrice | priceFilter }} &#8381;</span
          >
          <span class="product-new-price"
            >{{ item.price | priceFilter }} &#8381;</span
          >
        </div>

      </div>
    </NuxtLink>
</template>

<script>
export default {
  props: {
    product: {
      type: Array,
      default: () => [],
    },
    item: {
      type: Object,
      default: {}
    },
    sliderTranslate: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      noImage: require('~/assets/img/not-avaibale.jpg')
    }
  },
  methods: {
    addItemCart (id) {
      console.log(id)
    },
    async isImage(image) {
      try {
        const response = await fetch(image, { method: 'GET' })
        if(response) {
          return image
        }

      } catch(e) {
        return this.noImage
      }
    },
    helperImage(e) {
      e.target.src = this.noImage
    }
  }
}
</script>
