<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        Proverbial Soup
      </h1>
      <h2 class="subtitle">
        Beneficial sayings worth repeating and sharing in real life (or online)
      </h2>
      <div class="social">
        <a
          v-for="social in socialLinks" 
          v-bind:key="social.id"
          :href="`${social.url}`"
          target="_blank"
          style="display:inline-block;"
          >
          <img :src="`${social.image}`"  :alt="`${social.title }`" style="padding: 10px;" />
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
          image: require(`~/assets/img/twitter.png`),
          url: 'https://twitter.com/provsoup'
        },
        {
          id: 1,
          title: 'Instagram',
          image: require(`~/assets/img/instagram.png`),
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
