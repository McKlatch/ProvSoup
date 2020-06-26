<template>
  <card :quote="quote" />
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  head() {
    return {
      title: `Proverbial Soup · ${this.quote.proverb || 'Beneficial · Timeless · Wholesome'}`,
      meta: [
        // standard meta
        { hid: 'description', name: 'description', content: `
          Proverbial Soup · Beneficial sayings worth repeating and sharing in real life
          (or Online). Timeless quotes, captivating imagery, curated by David McClatchey.
        ` }
      ]
    }
  },
  data() {
    return {
      quote: {
        tags: [],
        contributor: 'proverb contributor',
        id: 'NotLoaded',
        created: new firebase.firestore.Timestamp(),
        imageURL: 'image URL',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      }
    }
  },
  created() {
    const rand = Math.floor(Math.random() * this.$store.getters.quotesCount)
    this.$router.push({
      path: `/${this.$store.getters.randomQuoteID(rand)}`
    })
  }
}

</script>
<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>
