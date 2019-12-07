<template>
  <nuxt-link :to="'/' + randomQuoteLabel">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 float-right rounded-b shadow">
        🔀
      </button>
  </nuxt-link>
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
    }
  }
}
</script>