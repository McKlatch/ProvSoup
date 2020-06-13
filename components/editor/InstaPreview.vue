<template>
  <div @click="copyText" class="border-2 bg-white hover:opacity-50">
    <img :src="quote.imageURL">
    <img src="~/assets/img/previews/InstaBar.jpg">
    <div class="p-2 text-sm">
    <span class="font-semibold">provsoup</span> <span ref="copyThis">"{{ quote.text }}" - {{ quote.contributor }}<br>
    ·<br>
    ·<br>
    ·<br>
    ____sS___<br>
    `-.,____,.-'<br>
    <span class="text-blue-900">#{{ showTags }}</span></span><br>
    <span class="text-gray-500 text-xs">1 day ago</span>
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default {
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
  computed: {
    showTags() {
      return this.quote.tags.join(' #')
    }
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.$refs.copyThis.innerText)
    }
  }
}

</script>
<style scoped>
</style>
