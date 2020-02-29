<template>
  <vultr-ad />
</template>

<script>
import VultrAd from '~/components/ads/vultr'

export default {
  components: {
    VultrAd
  },
  data() {
    return {
      adsAvailable: 1
    }
  },
  computed: {
    randomNo() {
      return Math.floor(Math.random() * Math.floor(this.adsAvailable))
    }
  },
  created() {
    console.log(this)
  }
}

</script>