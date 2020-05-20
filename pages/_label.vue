<template>
  <card :quote="quote" />
</template>
<script>
  import * as firebase from 'firebase/app'
import 'firebase/firestore'

import Card from '~/components/card/Card'

export default {
  validate ({ params }) {
    // Must be a number
    return /^[A-Z].*/.test(params.label)
  },
  head() {
    return {
      title: `Proverbial Soup · ${this.quote.text}`,
      meta: [
        // standard meta
        { hid: 'description', name: 'description', content: `
          ${this.quote.contributor} on Proverbial Soup · Beneficial sayings worth repeating and sharing in real life
          (or Online). Timeless quotes, captivating imagery, curated by David McClatchey.
        ` },
        // og data
        { hid: 'og:title', property: 'og:title', content: this.quote.text },
        { hid: 'og:url', property: 'og:url', content: `https://proverbialsoup.com/${this.quote.id}/` },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:description', property: 'og:description', content: `
          ${this.quote.contributor} quote on Proverbial Soup · Beneficial sayings worth repeating and sharing in real life
          (or Online). Timeless proverbs, captivating imagery, curated.
        ` },
        { hid: 'og:image', property: 'og:image', content: 'https://proverbialsoup.com' + require(`~/assets/img/quotes/${this.quote.id}.png`) },
        { hid: 'og:image:width', property: 'og:image:width', content: '1080' },
        { hid: 'og:image:height', property: 'og:image:height', content: '1080' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: this.quote.text },
        // twitter card
        { hid: 'twitter:card', name: 'twitter:card', content: 'photo' },
        { hid: 'twitter:title', name: 'twitter:title', content: `
          ${this.quote.contributor} quote on @ProvSoup` },
        { hid: 'twitter:url', name: 'twitter:url', content: `https://proverbialsoup.com/${this.quote.id}/` },
        { hid: 'twitter:description', name: 'twitter:description', content: `"${this.quote.text}" and other beneficial sayings worth repeating and sharing in real life (or Online). Timeless proverbs, captivating imagery, curated.` },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://proverbialsoup.com' + require(`~/assets/img/quotes/${this.quote.id}.png`) },
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
    this.quote = this.$store.getters.getQuoteByLabel(this.$route.params.label)
  }
}
</script>