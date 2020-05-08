<template>
  <div>
  <div class="flex items-center bg-gray-100">
  <form @submit.prevent="toTopResult" class="w-full max-w-sm">
    <div class="flex-auto">
      <input autofocus v-model="searchValue" class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none font-body" type="text" :placeholder="'🔎 ' + proverb" aria-label="Search" title="Search">
    </div>
  </form>
  <nuxt-link :to="'/' + randomQuoteLabel" class="flex-auto">
      <button class="bg-gray-300 hover:bg-gray-400 sm:text-lg md:text-2xl py-1 px-2 rounded-tr" title="Random Proverb">
        <i class="las la-random"></i>
      </button>
    </nuxt-link>
    
  </div>
  <results-display :suggests="suggests" />
</div>
</template>

<script>
import ResultsDisplay from '~/components/card/search/Results'

export default {
  props: {
    label: {
      type: String,
      required: true,
      default: 'NotLoaded'
    },
    proverb:{
      type: String,
      required: true,
      default: 'Loading...'
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
        return index.label !== this.label
      })
      const matches = filteredQuotes.filter(quote => {
        return quote.proverb.match(regex) || quote.origin.match(regex)
      })
      let displaySuggests = []
      matches.forEach(quote => {
        displaySuggests.push({
          label: quote.label,
          showProverb: quote.proverb.replace(regex, `<span class="suggestHL">${this.searchValue}</span>`),
          showOrigin: quote.origin.replace(regex, `<span class="suggestHL">${this.searchValue}</span>`)
        })
      })
      return this.searchValue ? displaySuggests : []
    },
    suggestsTop() {
      return this.suggests.slice(0, 1)[0]
    },
    randomQuoteLabel() {
      const rdyQuotes = this.$store.getters.readyQuotes
      const filteredQuotes = rdyQuotes.filter(index => {
        return index.label !== this.label
      })
      const rand = Math.floor(Math.random() * filteredQuotes.length)
      return filteredQuotes[rand].label
    },
  },
  methods: {
    toTopResult() {
      this.$router.push({
        path: `/${this.suggestsTop.label}`
      })
    }
  },
  created() {
    this.quotes = this.$store.getters.readyQuotes
  },
  components: {
    ResultsDisplay
  }
}
</script>

<style>
  .suggestHL {
    background:#ffc600;
  }
</style>