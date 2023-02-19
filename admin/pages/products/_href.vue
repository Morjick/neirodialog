<template>
  <section>
    <div class="primery-flex" style="margin: 0px 0 30px;">
      <h1>Название продукта: {{ product.name }}</h1>
      <ui-button
        text="Сохранить"
        mod="outline"
      />
    </div>
    <div class="prodict-row"><span>Цена:</span> {{ product.fixPrice }} &#8381;</div>
    <div class="prodict-row">
      <span>Скидка (в процентах):</span> 
      <ui-select 
        :list="discounts"
        idValue="discount"
        textValue="discount"
        :defaultValue="5"
        @change="changeDiscount"
        style="max-width: 70px; min-width: 70px; width: 70px;"
      />
    </div>
    <div class="prodict-row"><span>Итоговая цена:</span> {{ product.price }} &#8381;</div>
    <div class="prodict-row">
      <ui-checkbox 
        v-model="product.inMainPage"
        label="На главной странице"
      />
    </div>
    <div class="prodict-row">
      <ui-checkbox 
        v-model="product.show"
        label="Показывать в магазине"
      />
    </div>
    <div class="prodict-row">
      <span>Тип продукта:</span>
      <ui-select 
        :list="types"
        idValue="id"
        textValue="title"
        :defaultValue="product.type"
        @change="changeDiscount"
      />
    </div>
    <div class="prodict-row"><span style="width: 200px;">Описание продукта:</span> <p>{{ product.description }}</p></div>
    <div class="prodict-row align-center">
      <span>Колличество на складе:</span>
      <ui-input 
        v-model="product.stock"
        style="margin-left: 20px;"
      />
    </div>

  </section>
</template>

<script>
import UiSelect from '~/components/ui/UiSelect'
import UiCheckbox from '../../components/ui/UiCheckbox.vue'

export default {
  components: { UiSelect, UiCheckbox },
  name: 'UpdateProduct',
  async asyncData({ $axios, params, redirect }) {
    try {
      const { data: product } = await $axios.get(`product/get-one/${params.href}`)

      return { product }
    } catch(e) {
      redirect('/')
    }
  },
  data: () => ({
    discount: 0,
    discounts: [
        {discount: 'Нет', title: 'Нет'},
        {discount: 5, title: ''},
        {discount: 10, title: ''},
        {discount: 15, title: ''},
        {discount: 20, title: ''},
        {discount: 25, title: ''},
        {discount: 30, title: ''},
        {discount: 35, title: ''},
        {discount: 40, title: ''},
        {discount: 45, title: ''},
        {discount: 50, title: ''},
        {discount: 55, title: ''},
        {discount: 60, title: ''},
        {discount: 65, title: ''},
        {discount: 70, title: ''},
        {discount: 75, title: ''},
        {discount: 80, title: ''},
        {discount: 85, title: ''},
        {discount: 90, title: ''},
        {discount: 95, title: ''},
    ],
    allDiscounts: [
        {discount: 'Нет', title: 'Нет'},
        {discount: 5, title: ''},
        {discount: 10, title: ''},
        {discount: 15, title: ''},
        {discount: 20, title: ''},
        {discount: 25, title: ''},
        {discount: 30, title: ''},
        {discount: 35, title: ''},
        {discount: 40, title: ''},
        {discount: 45, title: ''},
        {discount: 50, title: ''},
        {discount: 55, title: ''},
        {discount: 60, title: ''},
        {discount: 65, title: ''},
        {discount: 70, title: ''},
        {discount: 75, title: ''},
        {discount: 80, title: ''},
        {discount: 85, title: ''},
        {discount: 90, title: ''},
        {discount: 95, title: ''},
    ],
    types: [
      { id: 1, title: 'Физический товар' },
      { id: 2, title: 'Электронный товар' },
      { id: 3, title: 'Ве товары' },
    ]
  }),
  computed: {
    productType () {
      return this.types.filter(el => el.title !== this.product.type)
    }
  },
  methods: {
    changeDiscount (item) {
      this.discount = item
      this.product.discount = item
      this.discounts = this.allDiscounts
      const discountElement = this.discounts.find(element => element.discount == this.product.discount)
      this.discounts = this.discounts.filter(element => element !== discountElement)
    }
  },
  mounted() {
    this.discounts = this.discounts.filter(element => element.discount !== this.product.discount)
    this.discount = this.product.discount
  },
}
</script>
