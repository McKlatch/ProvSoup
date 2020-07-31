<template>
  <div>
    <!-- <prov-ad /> -->
    <!-- <logo class="absolute top-0 left-0 m-1 w-8 md:m-4 md:w-10" /> -->
    <nuxt class="" />
    <!-- <social class="absolute bottom-0 right-0 mr-2" /> -->
  </div>
</template>

<script>
import ProvAd from '~/components/ads'
import Logo from '~/components/Logo'
import Social from '~/components/Social'

export default {
  components: {
    ProvAd,
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
