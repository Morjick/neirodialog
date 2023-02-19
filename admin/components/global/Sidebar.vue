<template>
  <aside class="sidebar">
    <div class="sidebar-inner">
      <div class="sidebar-header">
        <p>In Theme</p>
      </div>
      <div class="sidebar-body">
        <p class="sidebar-body-title">Страницы</p>
        <div 
          v-for="item in menu" 
          :key="item.id" 
          class="sidebar-body-item"
          :class="{ 
            '__active_sidebar-body-item': $route && $route.path == item.path,
            'open': item.open
          }"
          @click="changePage(item)"
        >
          <img v-if="item.icon" :src="item.icon" alt="">
          <span>{{ item.title }}</span>
          <ul v-if="item.menu" class="sidebar-body-item-submenu">
            <li 
              v-for="submenu in item.menu" 
              :key="submenu.id" 
              class="sidebar-body-item-submenu-item"
              @click="changePage(submenu)"
            >
              <span>{{ submenu.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Sidebar',
  props: {
  },
  data: () => ({
  }),
  methods: {
    ...mapMutations('app', ['openMenuItem']),
    changePage(item) {
      if(!item.path) {
        // item.open = true
        this.openMenuItem(item)
      } else {
        this.$router.push(item.path)
      }      
    }
  },
  mounted() {
  },
  computed: {
    ...mapGetters('app', ['getMenu']),
    menu() {
      return this.getMenu
    }
  }
}
</script>
