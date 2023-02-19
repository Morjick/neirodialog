<template>
  <section class="default-layout">
    <sidebar />
    <Tosts 
      :tosts="tosts"
    />
    <Confirm />
    <div class="content">
      <Header />
      <div class="content-body">
        <Nuxt />
      </div>
    </div>
  </section>
</template>

<script>
import Header from '~/components/global/Header'
import Sidebar from '~/components/global/Sidebar'
import Tosts from '~/components/global/Tosts'
import Confirm from '~/components/global/Confirm'

import { mapGetters } from 'vuex'

export default {
  components: { Sidebar, Header, Tosts, Confirm },
  name: 'DefaultLayout',
  props: {
  },
  computed: {
    ...mapGetters('app', ['getTosts']),
    tosts() {
      return this.getTosts
    }
  },
  data: () => ({
  }),
  methods: {
  },
  mounted() {
  },
}
</script>
