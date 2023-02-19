<template>
  <section class="ui-popover">
    <div class="ui-popover-overlay"></div>
    <div class="ui-popover-content">
      <slot :name="component" :item="component" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'UiPopover',
  props: {
    component: {

    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>
