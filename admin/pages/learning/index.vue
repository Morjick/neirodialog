<template>
  <section class="learning-page">
    <div class="primery-flex" style="margin: 0px 0 30px;">
      <h1>Курсы</h1>
      <ui-button
        text="Создать"
        @click="$router.push('/learning/create')"
        mod="outline"
      />
    </div>
    <div class="learning-content">
      <div v-for="item in learning" :key="item.id" class="learning-item product-list-body-item">
        <!-- <span class="product-list-body-item-image">
          <img 
            :src="
              item.avatar?.split('http').length > 1
                ? item.avatar
                : 'http://localhost:8080/' + item.avatar
            "
            alt=""
            @error="helperImage"
          >
        </span> -->
        <span class="product-list-body-item-name">{{ item.name }}</span>
        <span class="product-list-body-item-button">
          <ui-button 
            text="Дополнить курс"
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
  </section>
</template>

<script>
export default {
  name: 'LearningPage',
  async asyncData({ $axios }) {
    const { data: learning } = await $axios.get('learn/get-courses')

    return { 
      learning: learning.curses.map(el => el.dataValues)
    }
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
    helperImage(e) {
      e.target.src = this.noImage
    },
    async deleteProduct (item) {
      try {
        const { data: learningItem } = await this.$axios.delete(`learn/delete-couse/${item.id}`)
        const { data: learning } = await this.$axios.get('learn/get-courses')

        this.learning = learning.curses.map(el => el.dataValues)
      } catch(e) {
        console.warn(e)
      }
    },
    redirectToUpdate (item) {
      console.warn('error in redirect', item)
    }
  },
  mounted () {
  },
}
</script>
