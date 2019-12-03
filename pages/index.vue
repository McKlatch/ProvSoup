<template>
  <card :label="quote.label" :origin="quote.origin" :proverb="quote.proverb" :source="quote.source" />
</template>
<script>
import Card from '~/components/card/Card'

export default {
  head() {
    return {
      title: `Proverbial Soup · ${this.quote.proverb}`
    }
  },
  components: {
    Card
  },
  data() {
    return {
      quote: {
        label: 'NotLoaded',
        origin: 'ProvSoup ',
        proverb: 'Loading...',
        source: 'https://proverbialsoup.com/'
      }
    }
  },
  created() {
    const rdyQuotes = this.$store.getters.readyQuotes
    const rand = Math.floor(Math.random() * rdyQuotes.length)
    this.$router.push({
      path: `/${rdyQuotes[rand].label}`
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
