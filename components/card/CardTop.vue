<template>
  <div>
    <div class="flex items-center bg-gray-100">
      <form @submit.prevent="toTopResult" class="w-full">
        <div class="flex-auto">
          <input autofocus v-model="searchValue" class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none font-body" type="text" :placeholder="'🔎 ' + quote.text" aria-label="Search" title="Search">
        </div>
      </form>
      <nuxt-link :to="'/' + randomQuoteLabel" class="flex-auto">
        <button class="bg-gray-300 hover:bg-gray-400 sm:text-lg md:text-2xl px-2 pt-2 rounded-tr" title="Random Proverb">
          <i class="las la-random" style="color:#777;font-style:normal;font-size:32px;"></i>
        </button>
      </nuxt-link>
    </div>
    <results-display :suggests="suggests" />
  </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import ResultsDisplay from '~/components/card/search/Results'

export default {
  props: {
    quote: {
      type: Object,
      required: true,
      default: {
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
  data() {
    return {
      quotes: [],
      searchValue: ''
    }
  },
  computed: {
    suggests() {
      const regex = new RegExp(this.searchValue, 'gi')
      const filteredQuotes = this.quotes.filter(index => {
        return index.id !== this.quote.id
      })
      const matches = filteredQuotes.filter(quote => {
        return quote.text.match(regex) || quote.contributor.match(regex)
      })
      let displaySuggests = []
      matches.forEach(quote => {
        displaySuggests.push({
          label: quote.id,
          showProverb: quote.text.replace(regex, `<span class="suggestHL">${this.searchValue}</span>`),
          showOrigin: quote.contributor.replace(regex, `<span class="suggestHL">${this.searchValue}</span>`)
        })
      })
      return this.searchValue ? displaySuggests : []
    },
    suggestsTop() {
      return this.suggests.slice(0, 1)[0]
    },
    randomQuoteLabel() {
      let randomID
      do {
        randomID = this.$store.getters.randomQuoteID(Math.floor(Math.random() * this.$store.getters.quotesCount))
      } while (randomID == this.quote.id)
      return randomID
    }
  },
  methods: {
    toTopResult() {
      this.$router.push({
        path: `/${this.suggestsTop.label}`
      })
    }
  },
  created() {
    this.quotes = this.$store.getters.quotes
  },
  components: {
    ResultsDisplay
  }
}

</script>
<style>
.suggestHL {
  background: #ffc600;
}

</style>
