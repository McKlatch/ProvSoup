<template>
  <div>
    <div class="block pt-4 text-center">
      <logo class="inline-block w-10" />
    </div>
    <nuxt />
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
  head() {
    return {
      bodyAttrs: {
        class: 'container mx-auto w-screen h-screen bg-gray-100'
      }
    }
  }
}

</script>
