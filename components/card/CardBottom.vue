<template>
  <div class="inline-flex float-right">
    <button @click="copyProverb" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-bl" title="Copy Proverb">
      📋
    </button>
    <a :href="discoverLink">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2" title="More about this proverb">
        📖
      </button>
    </a>
    <button @click="copyLink" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2" title="Copy Link">
      🔗
    </button>
    <nuxt-link :to="'/' + randomQuoteLabel">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-br" title="Random Proverb">
        🔀
      </button>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
  props: {
    label: {
      type: String,
      required: true,
      default: 'NotLoaded'
    },
    origin: {
      type: String,
      required: true,
      default: 'ProvSoup '
    },
    proverb:{
      type: String,
      required: true,
      default: 'Loading...'
    },
    source:{
      type: String,
      required: false,
      default: 'https://proverbialsoup.com/'
    }
  },
  computed: {
    randomQuoteLabel() {
      const rdyQuotes = this.$store.getters.readyQuotes
      const filteredQuotes = rdyQuotes.filter(index => {
        return index.label !== this.label
      })
      const rand = Math.floor(Math.random() * filteredQuotes.length)
      return filteredQuotes[rand].label
    },
    discoverLink() {
      if (this.validURL(this.source)) return this.source
      // if (this.validBibleRef(this.origin)) return `http://www.biblegateway.com/passage/?search=${this.origin}&version=WEB`
      let queryText = ''
      if (!this.origin.toLowerCase().includes("unknown")) queryText += `${this.origin} `
      if (this.source && this.source !== this.origin) {
        if (!this.source.toLowerCase().includes("unknown")) queryText += `${this.source} `
      }
      queryText += this.proverb
      return `https://ecosia.org/search?q=${queryText}`
    }
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(`https://proverbialsoup.com/${this.label}`)
    },
    copyProverb() {
      navigator.clipboard.writeText(`"${this.proverb}" - ${this.origin}`)
    },
    validURL(i) {
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*') // port and path
      return pattern.test(i)
    },
    validBibleRef(i) {
      const pattern = new RegExp('([\d ]*[a-zA-Z]+( \d*:\d*)?)(( - )| )?(((\d* )?[a-zA-Z]+ )?\d*([:-]+\d*)?)') // returns everything :(
      return pattern.test(i)
    }
  }
}
</script>