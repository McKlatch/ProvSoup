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
      title: `Proverbial Soup · ${this.quote.proverb}`,
      meta: [
        // standard meta
        { hid: 'description', name: 'description', content: `
          ${this.quote.origin} on Proverbial Soup · Beneficial sayings worth repeating and sharing in real life
          (or Online). Timeless quotes, captivating imagery, curated by David McClatchey.
        ` },
        // og data
        { hid: 'og:title', name: 'og:title', content: this.quote.proverb },
        { hid: 'og:url', name: 'og:url', content: `http://www.proverbialsoup.com/${this.quote.label}` },
        { hid: 'og:type', name: 'og:type', content: 'website' },
        { hid: 'og:description', name: 'og:description', content: `
          ${this.quote.origin} on Proverbial Soup · Beneficial sayings worth repeating and sharing in real life
          (or Online). Timeless quotes, captivating imagery, curated.
        ` },
        { hid: 'og:image', name: 'og:image', content: 'http://www.proverbialsoup.com' + require(`~/assets/img/quotes/${this.quote.label}.png`) },
        // twitter card
        { hid: 'twitter:card', name: 'twitter:card', content: 'photo' },
        { hid: 'twitter:title', name: 'twitter:title', content: `
          ${this.quote.origin} on Proverbial Soup` },
        { hid: 'twitter:url', name: 'twitter:url', content: `http://www.proverbialsoup.com/${this.quote.label}` },
        { hid: 'twitter:description', name: 'twitter:description', content: `${this.quote.proverb} and other beneficial sayings worth repeating and sharing in real life (or Online). Timeless quotes, captivating imagery, curated.` },
        { hid: 'twitter:image', name: 'twitter:image', content: 'http://www.proverbialsoup.com' + require(`~/assets/img/quotes/${this.quote.label}.png`) },
      ]
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