<template>
  <div class="create-learn-page">
    <h1>Создание курса</h1>

    <ui-input 
      placeholder="Наименование курса"
      v-model="form.name"
    />

    <ui-input 
      placeholder="Базовая цена курса"
      v-model="form.price"
    />

    <ui-input 
      placeholder="Скидка, если есть"
      v-model="form.discount"
    />

    <ui-textaria 
      placeholder="Введите описание курса"
      v-model="form.description"
    />

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
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateLearnPage',
  props: {
  },
  data: () => ({
    form: {
      name: '',
      price: null,
      description: '',
      discount: null
    },
    loading: false
  }),
  computed: {
  },
  methods: {
    cancel () {
      this.$router.push('/learning')
    },
    async createProduct () {
      try {
        this.loading = true

        const { data: learning } = await this.$axios.post('learn/create-course', {
          ...this.form,
          discount: this.discount || 0,
          price: this.price || 0
        })
        
        if(learning.ok) {
          this.$router.push('/learning')
        }

        this.loading = false
      } catch(e) {
        this.loading = false
      }
    }
  },
  mounted () {
  },
}
</script>
