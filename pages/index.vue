<template>
  <div class="container mx-auto px-4 bg-gray-100">
    <div>
      <logo class="block mx-auto w-64 h-64 p-3 pt-16" />
      <h1 class="font-display block font-bold text-6xl text-gray-800 text-center">
        Proverbial Soup
      </h1>
      <h2 class="font-body block text-2xl text-pink-600 text-center">
        Beneficial sayings worth repeating and sharing in real life (or online)
      </h2>
      <div class="block pt-6 pb-16 text-center">
        <a
          v-for="social in socialLinks" 
          v-bind:key="social.id"
          :href="`${social.url}`"
          target="_blank"
          class="inline-block"
          >
          <img :src="`${social.image}`"  :alt="`${social.title }`" class="w-20 h-20 p-3" />
        </a>
      </div>

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
