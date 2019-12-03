<template>
  <card :label="quote.label" :origin="quote.origin" :proverb="quote.proverb" :source="quote.source" />
</template>
<script>
import Card from '~/components/card/Card'

export default {
  validate ({ params }) {
    // Must be a number
    return /^[A-Z].*/.test(params.label)
  },
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
    this.quote = this.$store.getters.getQuoteByLabel(this.$route.params.label)
  }
}
</script>