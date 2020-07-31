<template>
  <div class="pointer-events-auto">
    <image-modal :show="showModal" @close="showModal = false" >
      <img class="h-full object-contain" :src="displayImgURL" :alt="`&quot;${quote.text}&quot; - ${quote.contributor}`">
    </image-modal>
    <img class="w-full object-contain" :src="displayImgURL" :alt="`&quot;${quote.text}&quot; - ${quote.contributor}`" @click="showModal = true">
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'
import 'firebase/firestore'

import ImageModal from '~/components/card/ImageModal'

export default {
  components: {
    ImageModal
  },
  props: {
    quote: {
      type: Object,
      required: true,
      default: {
        tags: [],
        contributor: 'proverb contributor',
        id: 'NotLoaded',
        created: new firebase.firestore.Timestamp(),
        imageURL: '',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      }
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    displayImgURL() {
      if (this.quote.imageURL === '') {
        return require(`~/assets/img/quotes/NotLoaded.gif`)
      }
      return this.quote.imageURL
    }
  }
}
</script>