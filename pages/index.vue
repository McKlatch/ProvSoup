<template>
  <div>
    <div class="block pt-4 text-center">
      <logo class="inline-block w-10" />
      <h1 class="inline-block font-display font-bold text-lg text-gray-800">
        Proverbial Soup
      </h1>
    </div>
      <img
        :src="require(`~/assets/img/quotes/${quote.label}.png`)"
        :alt="`&quot;${quote.proverb}&quot; - ${quote.origin}`"
        class="block mx-auto md:w-1/2 lg:3/4 m-4 shadow-2xl font-body block text-2xl text-gray-800 text-center">
    <div class="block text-center">
      <a
        v-for="social in socialLinks" 
        v-bind:key="social.id"
        :href="`${social.url}`"
        target="_blank"
        class="inline-block"
        >
        <img :src="`${social.image}`"  :alt="`${social.title }`" class="w-12 h-12 p-1" />
      </a>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data () {
    return {
      inQuotes: [],
      quote: {
        label: 'NotLoaded',
        origin: 'ProvSoup ',
        proverb: 'Loading...',
        source: 'https://proverbialsoup.com/'
      },
      socialLinks: [
        {
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
    quotes () {
      return this.inQuotes.filter(function(index) {
        return index.label;
      });
    }
  },
  methods: {
    async fetchSomething() {
      const inQuotes = await this.$axios.$get('https://api.sheety.co/28999f15-3e1a-47f2-83e2-619d2b8e1287')
      this.inQuotes = inQuotes
      this.genQuote()
    },
    genQuote () {
      const rand = Math.floor(Math.random() * this.quotes.length)
      const selected = this.quotes[rand]
      this.quote = selected !== this.quote ? selected : this.quotes[0]
    }
  },
  created () {
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
