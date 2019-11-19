<template>
  <div>
    <div class="block pt-4 text-center">
      <logo class="inline-block w-10" />
    </div>
    <div class="block text-center m-4">
    <img :src="displayImgURL" :alt="`&quot;${quote.proverb}&quot; - ${quote.origin}`" class="mx-auto md:w-1/2 shadow-2xl font-body text-2xl text-gray-800">
    <button
      class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-b-lg items-center shadow-lg"
      @click="randomQuote()">
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z"/></svg>
    </button>
    </div>
    <social class="block text-center" />
  </div>
</template>
<script>
import Logo from '~/components/Logo.vue'
import Social from '~/components/Social.vue'

export default {
  components: {
    Logo,
    Social
  },
  data() {
    return {
      inQuotes: [],
      quote: {
        label: 'NotLoaded',
        origin: 'ProvSoup ',
        proverb: 'Loading...',
        source: 'https://proverbialsoup.com/'
      },
      socialLinks: [{
          id: 0,
          title: 'Twitter',
          image: require(`~/assets/img/twitter.svg`),
          url: 'https://twitter.com/provsoup'
        },
        {
          id: 1,
          title: 'Instagram',
          image: require(`~/assets/img/instagram.svg`),
          url: 'https://www.instagram.com/provsoup'
        }
      ]
    }
  },
  computed: {
    quotes() {
      return this.inQuotes.filter(function(index) {
        return index.label;
      });
    },
    displayImgURL() {
      if (this.quote.label === "NotLoaded") {
        return require(`~/assets/img/quotes/${this.quote.label}.gif`)
      }
      return require(`~/assets/img/quotes/${this.quote.label}.png`)
    }
  },
  methods: {
    async fetchSomething() {
      const inQuotes = await this.$axios.$get('https://api.sheety.co/28999f15-3e1a-47f2-83e2-619d2b8e1287')
      this.inQuotes = inQuotes
      this.randomQuote()
    },
    randomQuote() {
      const rand = Math.floor(Math.random() * this.quotes.length)
      const selected = this.quotes[rand]
      this.quote = selected !== this.quote ? selected : this.quotes[0]
    }
  },
  created() {
    this.fetchSomething()
  }
}

</script>
<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/

</style>
