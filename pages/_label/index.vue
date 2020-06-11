<template>
  <div class="container mx-auto absolute inset-0 flex">
    <div class="hidden md:flex md:items-center md:justify-center md:inline-block md:flex-1">
      <div class="">
        <i v-if="soupContext.earliest" @click="$router.push(`/${soupContext.earliest}`)" class="las la-angle-double-left" style="color:#777;font-style:normal;font-size:32px;"></i>
      </div>
    </div>
    <div class="hidden md:flex md:items-center md:justify-center md:inline-block md:flex-1">
      <div class="">
        <i v-if="soupContext.last" @click="$router.push(`/${soupContext.last}`)" class="las la-angle-left" style="color:#777;font-style:normal;font-size:32px;"></i>
      </div>
    </div>
    <div class="flex items-center justify-center inline-block flex-auto md:flex-2">
      <card :quote="quote" class="" />
    </div>
    <div class="hidden md:flex md:items-center md:justify-center md:inline-block md:flex-1">
      <div class="">
        <i v-if="soupContext.next" @click="$router.push(`/${soupContext.next}`)" class="las la-angle-right" style="color:#777;font-style:normal;font-size:32px;"></i>
      </div>
    </div>
    <div class="hidden md:flex md:items-center md:justify-center md:inline-block md:flex-1">
      <div class="">
        <i v-if="soupContext.latest" @click="$router.push(`/${soupContext.latest}`)" class="las la-angle-double-right" style="color:#777;font-style:normal;font-size:32px;"></i>
      </div>
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
