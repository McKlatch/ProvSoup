<template>
  <card :label="quote.label" :origin="quote.origin" :proverb="quote.proverb" :source="quote.source" />
</template>
<script>
import Card from '~/components/Card/Card'

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
      inQuotes: [],
      quote: {
        label: 'NotLoaded',
        origin: 'ProvSoup ',
        proverb: 'Loading...',
        source: 'https://proverbialsoup.com/'
      }
    }
  },
  computed: {
    quotes() {
      return this.inQuotes.filter(function(index) {
        return index.label;
      });
    },
    displayImgURL() {
      if (this.quote.label === "NotLoaded") {
        return require(`~/assets/img/quotes/${this.quote.label}.gif`)
      }
      return require(`~/assets/img/quotes/${this.quote.label}.png`)
    }
  },
  methods: {
    async fetchSomething() {
      const inQuotes = await this.$axios.$get('https://api.sheety.co/28999f15-3e1a-47f2-83e2-619d2b8e1287')
      this.inQuotes = inQuotes
      this.randomQuote()
    },
    randomQuote() {
      const rand = Math.floor(Math.random() * this.quotes.length)
      const selected = this.quotes[rand]
      this.quote = selected !== this.quote ? selected : this.quotes[0]
    }
  },
  created() {
    this.fetchSomething()
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
