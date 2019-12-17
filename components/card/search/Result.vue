<template>
  <li class="bg-white p-1">
    <nuxt-link :to="'/' + label"><span class="name" v-html="showProverb"></span> <span class="text-gray-500 text-xs" v-html="showOrigin"></span></nuxt-link>
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
  }
}
</script>

<style>
  .suggestHL {
    background:#ffc600;
  }
</style>