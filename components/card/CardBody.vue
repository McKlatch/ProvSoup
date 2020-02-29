<template>
  <div>
    <image-modal :show="showModal" @close="showModal = false" >
      <img class="h-full object-contain" :src="displayImgURL" :alt="`&quot;${proverb}&quot; - ${origin}`">
    </image-modal>
    <img class="w-full" :src="displayImgURL" :alt="`&quot;${proverb}&quot; - ${origin}`" @click="showModal = true">
  </div>
</template>

<script>
import ImageModal from '~/components/card/ImageModal'

export default {
  components: {
    ImageModal
  },
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
  data() {
    return {
      showModal: false
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