<template>
  <div class="md:w-10/12 lg:w-8/12 xl:w-1/2 md:mx-auto">
    <Nav :quote="quote" class="p-2" />
    <!-- Mobile Arrangement -->
    <div class="md:hidden">
      <ProvSquare :quote="quote" v-touch:swipe="swipeHandler" />
      <Panel :quote="quote" class="p-2" />
      <AdSquare />
      <Scroll :quote="quote" class="p-2" />
      <AdText />
      <About class="p-2 md:p-0" />
    </div>
    <!-- Desktop Arrangement -->
    <!-- <div class="hidden md:flex md:pt-8">
      <div class="w-3/4">
        <ProvSquare :quote="quote" v-touch:swipe="swipeHandler" />
        <Scroll :quote="quote" class="p-2" />
      </div>
      <div class="flex flex-col w-1/4">
        <AdSquare class="flex-1" />
        <Panel :quote="quote" class="flex-1 m-auto p-1" />
        <AdText class="flex-1 m-auto px-2" />
        <About class="pb-2" />
      </div>
    </div> -->
    <!-- Desktop Arrangement -->
    <div class="hidden md:flex md:pt-1">
        <ProvSquare class="w-3/4 inline-block" :quote="quote" v-touch:swipe="swipeHandler" />
        <div class="flex flex-col w-1/4 inline-block">
          <AdSquare class="flex-initial" />
          <Panel :quote="quote" class="flex-auto m-auto p-1" />
          <AdText class="flex-auto m-auto px-2" />
        </div>
      </div>
      <div class="hidden md:flex md:mt-2 bg-gray-100">
        <Scroll :quote="quote" class="w-3/4 p-2" />
        <About class="w-1/4 pb-2" />
    </div>
  </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  validate({ params }) {
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
        { hid: 'og:image', property: 'og:image', content: this.quote.imageURL },
        { hid: 'og:image:width', property: 'og:image:width', content: '1080' },
        { hid: 'og:image:height', property: 'og:image:height', content: '1080' },
        { hid: 'og:image:alt', property: 'og:image:alt', content: this.quote.text },
        // twitter card
        { hid: 'twitter:card', name: 'twitter:card', content: 'photo' },
        { hid: 'twitter:title', name: 'twitter:title', content: `
          ${this.quote.contributor} quote on @ProvSoup` },
        { hid: 'twitter:url', name: 'twitter:url', content: `https://proverbialsoup.com/${this.quote.id}/` },
        { hid: 'twitter:description', name: 'twitter:description', content: `"${this.quote.text}" and other beneficial sayings worth repeating and sharing in real life (or Online). Timeless proverbs, captivating imagery, curated.` },
        { hid: 'twitter:image', name: 'twitter:image', content: this.quote.imageURL },
        // awin verification
        { hid: 'verification', name: 'verification', content: 'ebb237a3e04660f87928beda0252d2b8' }
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
        imageURL: '',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      },
      soupContext: {
        earliest: '',
        last: '',
        next: '',
        latest: ''
      }
    }
  },
  methods: {
    swipeHandler(direction) {
      if (direction == 'left' && this.soupContext.next != '') {
        this.$router.push(`/${this.soupContext.next}`)
      }
      if (direction == 'right' && this.soupContext.last != '') {
        this.$router.push(`/${this.soupContext.last}`)
      }
    }
  },
  created() {
    this.quote = this.$store.getters.getQuoteByLabel(this.$route.params.label)
    if (!this.quote.published) {
      this.$router.push('/')
    }
    const quotesArray = this.$store.getters.quotes
    const quotesTarget = quotesArray.findIndex(x => x.id === this.quote.id)
    this.soupContext = {
      earliest: quotesArray[0].id != this.quote.id ? quotesArray[0].id : '',
      last: quotesArray[quotesTarget - 1] ? quotesArray[quotesTarget - 1].id : '',
      next: quotesArray[quotesTarget + 1] ? quotesArray[quotesTarget + 1].id : '',
      latest: quotesArray[quotesArray.length - 1].id != this.quote.id ? quotesArray[quotesArray.length - 1].id : ''
    }
  }
}

</script>
