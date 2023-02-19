<template>
  <section :style="`background-image: url('${image || noImage}')`" class="ui-image"></section>
</template>

<script>
export default {
  name: 'UiImage',
  props: {
    url: {
      type: String,
      default: 'not-avaibale.jpg'
    }
  },
  data() {
    return {
      noImage: require('~/assets/img/not-avaibale.jpg'),
      image: null
    }
  },
  methods: {
    async getImage() {
      try {
        const isImage = await fetch(this.url, {
          method: 'GET'
        })
        console.log(isImage)

        if(isImage !== 404) {
          return '/_nuxt/assets/img/not-avaibale.jpg'
        } else {
          this.image = this.url
        }

        

      } catch(e) {
        return '/_nuxt/assets/img/not-avaibale.jpg'
      }
    }
  },
  mounted() {
    this.getImage()
  }
}
</script>
