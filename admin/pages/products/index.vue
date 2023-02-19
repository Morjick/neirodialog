<template>
  <section style="width: 100%">
    <div class="primery-flex" style="margin: 0px 0 30px;">
      <h1>Продукты</h1>
      <ui-button
        text="Создать"
        @click="$router.push('/products/create')"
        mod="outline"
        v-if="permission"
      />
    </div>

    <div class="product-filter">

    </div>

    <div class="product-list">
      <div class="product-list-header">
        <span class="product-list-body-item-id">№</span>
        <span class="product-list-body-item-image">Изображение</span>
        <span class="product-list-body-item-name">Наименование</span>
          <span class="product-list-body-item-button">Действие</span>
      </div>
      <div class="product-list-body">
        <div 
          v-for="(item, ind) in products" 
          :key="item.id" 
          :id="`product-${item.id}`"
          class="product-list-body-item"
        >
          <span class="product-list-body-item-id">{{ ind + 1 }}</span>
          <span class="product-list-body-item-image">
            <img 
              :src="
                item.avatar?.split('http').length > 1
                  ? item.avatar
                  : 'http://localhost:8080/' + item.avatar
              "
              alt=""
              @error="helperImage"
            >
          </span>
          <span class="product-list-body-item-name">{{ item.name }}</span>
          <span class="product-list-body-item-button">
            <ui-button 
              text="Редактировать"
              @click="redirectToUpdate(item)"
            />
            <ui-button 
              text="Удалить"
              mod="outline"
              style="margin-top: 3px;"
              @click="deleteProduct(item)"
            />
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UiButton from '../../components/ui/UiButton.vue'
export default {
  components: { UiButton },
  middleware: ['auth'],
  name: 'ProductsPage',
  async asyncData({ $axios }) {
    try {
      async function getPermission () {
          try {
          const { data: permission } = await $axios.get('product/get-permission/updateUsers')
          return permission
        } catch(e) {
          return false
        }
      }

      const { data: products } = await $axios.get('product/get-many?adminPage=true')
      // const permission = await getPermission()

      return { products, permission: true }
    } catch(e) {
      return {
        products: [],
        permission: false
      }
    }
  },
  props: {
  },
  data: () => ({
    noImage: require('~/assets/img/not-avaibale.jpg')
  }),
  computed: {
  },
  methods: {
    helperImage(e) {
      e.target.src = this.noImage
    },
    async deleteItem(item) {
      try {
        const { data: removed } = await this.$axios.delete(`product/delete-product/${item.id}`) 
        console.log(removed)

        if(removed.ok) {
          const product = document.getElementById(`product-${item.id}`)
          product.classList.add('removed')
          setTimeout(() => product.classList.add('kill'), 1000)
          setTimeout(() => this.products = this.products.filter( el => el.id !== item.id), 1500)          
        }
      } catch(e) {
        console.warn(e)
      }
    },
    async deleteProduct (item) {
      this.$createConfirm({
        message: 'Пожалуйста, подтвердите удаление продукта',
        okFunction: this.deleteItem,
        params: item,
        visible: true
      })

    },
    redirectToUpdate (item) {
      this.$router.push(`/products/${item.id}`)
    }
  },
  mounted() {
  },
}
</script>
