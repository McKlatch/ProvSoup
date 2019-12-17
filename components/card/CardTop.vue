<template>
  <form class="w-full max-w-sm">
    <div class="flex items-center py-1">
      <input v-model="searchValue" class="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none" type="text" :placeholder="'🔎 ' + proverb" aria-label="Search">
      <!--  <button class="flex-shrink-0 border-transparent border-4 py-1 px-2 rounded" type="button">
        🔀
      </butto -->
    </div>
    <results-display :suggests="suggests" />
  </form>
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
      const matches = this.quotes.filter(quote => {
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