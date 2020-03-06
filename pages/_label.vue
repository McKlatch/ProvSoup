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
        { hid: 'og:title', property: 'og:title', content: this.quote.proverb },
        { hid: 'og:url', property: 'og:url', content: `https://proverbialsoup.com/${this.quote.label}/` },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:description', property: 'og:description', content: `
          ${this.quote.origin} quote on Proverbial Soup · Beneficial sayings worth repeating and sharing in real life
          (or Online). Timeless proverbs, captivating imagery, curated.
        ` },
        { hid: 'og:image', property: 'og:image', content: 'https://proverbialsoup.com' + require(`~/assets/img/quotes/${this.quote.label}.png`) },
        { hid: 'og:image:width', property: 'og:image:width', content: '1080' },
        { hid: 'og:image:height', property: 'og:image:height', content: '1080' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: this.quote.proverb },
        // twitter card
        { hid: 'twitter:card', name: 'twitter:card', content: 'photo' },
        { hid: 'twitter:title', name: 'twitter:title', content: `
          ${this.quote.origin} quote on @ProvSoup` },
        { hid: 'twitter:url', name: 'twitter:url', content: `https://proverbialsoup.com/${this.quote.label}/` },
        { hid: 'twitter:description', name: 'twitter:description', content: `"${this.quote.proverb}" and other beneficial sayings worth repeating and sharing in real life (or Online). Timeless proverbs, captivating imagery, curated.` },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://proverbialsoup.com' + require(`~/assets/img/quotes/${this.quote.label}.png`) },
        // awin verification
        { hid: 'verification', name: 'verification', content: 'ebb237a3e04660f87928beda0252d2b8'}
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