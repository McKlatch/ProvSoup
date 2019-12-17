<template>
  <li @click="goTo(label)" class="p-1" style="cursor:pointer">
    <span class="name" v-html="showProverb"></span> <span class="text-gray-500 text-xs" v-html="showOrigin"></span>
  </li>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
      default: 'NotLoaded'
    },
    showProverb:{
      type: String,
      required: true,
      default: '<span class="suggestHL">ProvError</span>'
    },
    showOrigin:{
      type: String,
      required: true,
      default: '<span class="suggestHL">OriginError</span>'
    }
  },
  methods: {
    goTo(label) {
      this.$router.push({
        path: `/${label}`
      })
    }
  }
}
</script>

<style>
  .suggestHL {
    background:#ffc600;
  }
</style>