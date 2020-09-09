<template>
  <div class="md:w-10/12 lg:w-8/12 xl:w-1/2 md:mx-auto">
    <Nav :quote="quote" class="p-2" />
    <div class="absolute inset-0 flex items-center justify-center">
      <p class="font-display text-gray-700 text-4xl text-center">Warming up some soup...</p>
    </div>
  </div>
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
    const quotesArray = this.$store.getters.quotes
    this.$router.push({
      path: `/${quotesArray[quotesArray.length - 1].id}`
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
