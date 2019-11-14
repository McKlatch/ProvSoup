<template>
  <div>
    <logo class="block mx-auto w-32 h-32 p-3 pt-16" />
    <h1 class="font-display block font-bold text-4xl text-gray-800 text-center">
      Proverbial Soup
    </h1>
    <h2 class="font-body block text-lg text-pink-600 text-center">
      Beneficial sayings worth repeating and sharing in real life (or online)
    </h2>
    <p class="font-body block text-4xl text-pink-600 text-center pt-16">"{{quote.proverb}}"</p>
    <small class="font-body block text-2xl text-gray-800 text-center">{{quote.origin}}</small>
    <div class="block pt-16 pb-16 text-center">
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
