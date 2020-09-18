<template>
  <div>
    <div v-if="true">
      <!-- START ADVERTISER: TrustedHousesitters (US) from awin.com -->
      <a v-if="type == 'mobile'" href="https://www.awin1.com/cread.php?s=444957&v=5759&q=212603&r=667291" class="block md:hidden">
        <img src="https://www.awin1.com/cshow.php?s=444957&v=5759&q=212603&r=667291" class="mx-auto" border="0">
      </a>
      <a v-if="type == 'desktop'" href="https://www.awin1.com/cread.php?s=446267&v=5759&q=215135&r=667291" class="hidden md:block">
        <img src="https://www.awin1.com/cshow.php?s=446267&v=5759&q=215135&r=667291" border="0">
      </a>
      <a v-if="type == 'text'" href="https://www.awin1.com/awclick.php?gid=379677&mid=5759&awinaffid=667291&linkid=2549174&clickref=" target="_blank" rel="noopener" aria-label="" class="flex bg-gray-100 text-center pointer-events-auto">
        <p title="Trusted Housesitters" class="font-body text-green-700 m-auto p-2">Find 1000s Of House Sitting Opportunities Or Unlimited Pet Care. Insurance Backed Guarantee Included. 24/7 Membership Services.. Join&nbsp;Today</p>
      </a>
      <!-- END ADVERTISER: TrustedHousesitters (US) from awin.com -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      default: 'mobile'
    }
  }
}

</script>
