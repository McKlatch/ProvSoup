<template>
  <div id="defaultbg" class="h-screen">
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

<style>
#defaultbg {
  background-image: linear-gradient(90deg, rgb(255,255,255) 0%,transparent 78%),repeating-linear-gradient(135deg, rgba(126,126,126, 0.03) 0px, rgba(126,126,126, 0.03) 1px,transparent 1px, transparent 15px),repeating-linear-gradient(45deg, rgba(126,126,126, 0.03) 0px, rgba(126,126,126, 0.03) 1px,transparent 1px, transparent 15px),repeating-linear-gradient(90deg, rgba(126,126,126, 0.03) 0px, rgba(126,126,126, 0.03) 1px,transparent 1px, transparent 15px),linear-gradient(45deg, rgb(255,255,255),rgb(255,255,255));
}
</style>