<template>
  <section class="page-content">
    <h1>Создание продукта</h1>
    <div class="product-create-header">
      <input type="file" ref="avatarInput" class="avatar-input" @change="setAvatar">
      <div 
        class="product-create-avatar"
        @click="trigerInput" 
        ref="avatar"
      >
        <p v-if="!isAvatar">Кликните, чтобы установить изображение</p>
      </div>
      <div class="product-create-main-info">
        <ui-select 
          :list="[{ id: 1, title: 'Электронный продукт' }, { id: 2, title: 'Физический продукт' }]"
          v-model="type"
          defaultValue="Выберите тип продукта"
          idValue="title"
        />
        <ui-input 
          placeholder="Наименование продукта"
          v-model="name"
        />
        <ui-input 
          placeholder="Артикуль продукта"
          v-model="articule"
        />
        <ui-input 
          placeholder="Количество товара на складе"
          v-model="count"
        />
      </div>
      <div class="product-create-main-info">
        <ui-input 
          inputType="color"
          label="Основной цвет продукта"
          v-model="color"
        />
        <ui-input 
          placeholder="Базовая цена продукта"
          v-model="price"
        />
        <ui-input 
          placeholder="Скидка на продукт (если есть)"
          v-model="discout"
        />
        <ui-checkbox 
          label="Опубликовать товар"
          v-model="visible"
          style="margin-bottom: 15px;"
        />
        <ui-checkbox 
          label="На главную страница товар"
          v-model="inMainPage"
          v-if="visible"
        />
      </div>
    </div>

    <div class="product-create-body">
      <ui-textaria 
        placeholder="Введите описание товара"
        v-model="description"
      />
    </div>

    <div class="btn-container btn-container--right">
      <ui-button 
        text="Отменить"
        style="margin-right: 10px; margin-left: auto;"
        @click="cancel"
        mod="danger"
      />
      <ui-button 
        text="Сохранить"
        @click="createProduct"
      />
    </div>
    
  </section>
</template>

<script>
import UiButton from '../../components/ui/UiButton.vue'
import UiCheckbox from '../../components/ui/UiCheckbox.vue'
import UiInput from '../../components/ui/UiInput.vue'
import UiSelect from '../../components/ui/UiSelect.vue'
import UiTextaria from '../../components/ui/UiTextaria.vue'
export default {
  components: { UiInput, UiSelect, UiTextaria, UiCheckbox, UiButton },
  name: 'CreateProductPage',
  middleware: ['auth'],
  props: {
  },
  data: () => ({
    name: '',
    discout: 0,
    price: '',
    type: 'Ничего нет',
    articule: '',
    count: '',
    color: '',
    description: '',
    visible: false,
    inMainPage: false,

    isAvatar: false,
    avatar: null,
  }),
  computed: {
  },
  methods: {
    trigerInput() {
      this.$refs.avatarInput.click()
    },
    setAvatar (e) {
      const avatar = e.target.files[0]

      this.isAvatar = true
      this.avatar = avatar

      const filereader = new FileReader()

      filereader.onload = () => {
        this.$refs.avatar.style.backgroundImage = `url('${filereader.result}')`
      }

      filereader.readAsDataURL(avatar)
    },
    async createProduct () {
      try {
        const formdata = new FormData()
        console.log({
          name: this.name,
          discout: Number(this.discout),
          fixPrice: Number(this.price),
          type: this.type,
          articule: this.articule,
          stock: Number(this.count),
          color: this.color,
          description: this.description,
          visible: this.visible,
          avatar: this.avatar,
        })

        formdata.append('productName', String(this.name))
        formdata.append('discount', Number(this.discout))
        formdata.append('fixPrice', Number(this.price))
        formdata.append('type', this.type)
        formdata.append('articule', this.articule)
        formdata.append('stock', this.count)
        formdata.append('color', this.color)
        formdata.append('description', this.description)
        formdata.append('show', Boolean(this.visible))
        formdata.append('avatar', this.avatar)
        formdata.append('sellerName', 'Неиродиалог')

        const { data } = await this.$axios.post('product/create-product', {
          productName : this.name,
          discount: Number(this.discout),
          fixPrice: Number(this.price),
          type: this.type,
          articule: this.articule,
          stock: Number(this.count),
          color: this.color,
          description: this.description,
          visible: this.visible,
          sellerName: 'Неиродиалог',
          show: Boolean(this.visible),
          inMainPage: false,
        })
        console.log(data)
        
        if(data && data.id) {
          this.$router.push('/products')
        }     
      } catch(e) {
        console.warn(e)
      }
    },
    cancel() {
      this.$router.push('/products')
    }
  },
  mounted() {
  },
}
</script>
