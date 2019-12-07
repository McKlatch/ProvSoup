<template>
  <img class="w-full rounded-tl rounded-tr rounded-bl shadow" :src="displayImgURL" :alt="`&quot;${proverb}&quot; - ${origin}`">
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
      default: 'NotLoaded'
    },
    origin: {
      type: String,
      required: true,
      default: 'ProvSoup '
    },
    proverb:{
      type: String,
      required: true,
      default: 'Loading...'
    }
  },
  computed: {
    displayImgURL() {
      if (this.label === "NotLoaded") {
        return require(`~/assets/img/quotes/${this.label}.gif`)
      }
      return require(`~/assets/img/quotes/${this.label}.png`)
    }
  }
}
</script>