<template>
  <section 
    class="confirm-section"
    :class="{
      'visible': confirm.visible
    }"
  >
    <div class="confirm ">
      <p>{{ confirm.message || 'Пожалуйста, подтвердите своё действие' }}</p>

      <div class="btn-container">
        <ui-button 
          :text="confirm.cancelText || 'Отмена'"
          mod="danger"
          @click="cancel"
          style="margin-right: 10px;"
          size="small"
        />
        <ui-button 
          :text="confirm.okText  || 'Подтверждаю'"
          @click="pushConfirm"
          size="small"
        />
      </div>
    </div>
  </section>
</template>

<script>
import UiButton from '../ui/UiButton.vue'

import { mapGetters } from 'vuex'

export default {
  components: { UiButton },
  name: 'Confirm',
  props: {
  },
  data: () => ({
  }),
  computed: {
    ...mapGetters('app', ['getConfirm']),
    confirm() {
      return this.getConfirm
    }
  },
  methods: {
    async cancel () {
      this.$cancelConfir()
    },
    pushConfirm () {
      this.$confirm()
    }
  },
  mounted() {
  },
}
</script>
