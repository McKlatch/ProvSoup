<template>
  <div class="flex flex-col">
    <logo class="absolute top-0 left-0 m-1 w-8 md:m-4 md:w-10" />
    <nuxt class="m-12" />
    <social class="absolute bottom-0 right-0 mr-2" />
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
  head() {
    return {
      bodyAttrs: {
        class: 'w-screen h-screen bg-gray-100'
      }
    }
  }
}

</script>
