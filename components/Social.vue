<template>
  <div>
  <a v-for="social in socialLinks" v-bind:key="social.id" :href="`${social.url}`" target="_blank" class="inline-block">
    <img :src="`${social.image}`" :alt="`${social.title }`" class="w-5 h-5 md:w-8 md:h-8 m-1" />
  </a>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  }
}
</script>