<template>
  <div class="bg-gray-100 pointer-events-auto">
    <input autofocus v-model="searchValue" class="appearance-none bg-transparent border-none w-full text-gray-700 -mx-2 p-1 leading-tight focus:outline-none font-body" type="text" :placeholder="'🔎 ' + quote.text" aria-label="Search" title="Search">
    <results :suggests="suggests" class="mt-2 -ml-5 md:-ml-16 lg:-ml-32" />
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
    }
  },
  created() {
    this.quotes = this.$store.getters.quotes
  }
}

</script>