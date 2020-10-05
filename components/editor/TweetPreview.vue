<template>
  <div @click="copyText" class="border-2 bg-white hover:opacity-50 p-2">
    <p ref="copyTweet" class="">
      "{{ quote.text }}" - {{ quote.contributor }}<br>
      <span class="text-blue-400">#{{ showTags }}</span>
    </p>
    <img :src="quote.imageURL" class="object-cover h-32 w-full my-2 rounded-lg border">
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
    charCount() {
      const tweetString = `"${this.quote.text}" - ${this.quote.contributor}
        #${this.quote.tags.join(' #')}`
      return tweetString.length
    },
    showTags() {
      let tags = this.quote.tags.join(' #')
      let tagLen = tags.length
      const quoteLen = this.quote.text.length + 6 // quotes dash and spaces

      while ((tagLen + quoteLen) > 260) { // max tweetlenght - 20 (botchfix)
        tags = tags.substring(0, tags.lastIndexOf(' #'))
        tagLen = tags.length
      }

      return tags
    }
  },
  methods: {
    async copyText() {
      try {
        await this.$copyText(this.$refs.copyTweet.innerText);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

</script>
<style scoped>
</style>
