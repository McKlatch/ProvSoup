<template>
  <div>
    <vultr-ad v-if="false" />
    <degusta-ad v-if="false" />
    <ethic-super-ad v-if="true" />
  </div>
</template>

<script>
import VultrAd from '~/components/ads/vultr'
import DegustaAd from '~/components/ads/degusta'
import EthicSuperAd from '~/components/ads/ethicalsuperstore'

export default {
  components: {
    VultrAd, DegustaAd, EthicSuperAd
  },
  data() {
    return {
      adsAvailable: 3
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