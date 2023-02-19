<template>
  <section class="tost-section">
    <div 
      v-for="(item, ind) in tosts" 
      :key="item" 
      class="tost"
      :class="{
        'ok': item.status >= 200 && item.status < 300,
        'warning': item.status >= 300 && item.status < 500,
        'danger': item.status >= 500,
        'visible': item.overtime > 0
      }"
      :id="`tost-${ind}`"
    >
      <div class="tost-inner">
        <p>{{ item.message }}</p>
        <div class="tost-scrollbar">
          <div></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Tost',
  props: {
    tosts: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
  }),
  computed: {
  },
  methods: {
    ...mapMutations('app', ['deleteTost'])
  },
  mounted() {
    setInterval(() => {
      this.tosts.forEach( (el, ind) => {
        setTimeout(() => {
          const tost = document.getElementById(`tost-${ind}`)
          tost.classList.remove('visible')
          setTimeout(() => this.deleteTost(el), 500)
        }, el.overtime)
      })
    }, 500)
  },
}
</script>
