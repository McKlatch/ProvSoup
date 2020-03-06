<template>
  <div>
    <vultr-ad v-if="false" />
    <degusta-ad v-if="true" />
  </div>
</template>

<script>
import VultrAd from '~/components/ads/vultr'
import DegustaAd from '~/components/ads/degusta'

export default {
  components: {
    VultrAd, DegustaAd
  },
  data() {
    return {
      adsAvailable: 2
    }
  },
  computed: {
    randomNo() {
      return Math.floor(Math.random() * Math.floor(this.adsAvailable))
    }
  },
  created() {
    // console.log(this)
  }
}

</script>