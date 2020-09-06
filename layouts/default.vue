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
  background-color: #f7fafc;
background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a8a8a8' fill-opacity='0.28' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>