<template>
<a class="flex-1" :href="clickURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true">
  <button class="bg-gray-300 hover:bg-gray-400" :title="titleText">
    <span class="m-1 mt-2 sm:text-lg md:text-2xl">
      <slot />
    </span>
  </button>
</a>
</template>

<script>
  export default {
  props: {
    label: {
      type: String,
      required: true,
      default: 'NotLoaded'
    },
    origin: {
      type: String,
      required: true,
      default: 'ProvSoup '
    },
    proverb:{
      type: String,
      required: true,
      default: 'Loading...'
    },
    source:{
      type: String,
      required: false,
      default: 'https://proverbialsoup.com/'
    },
    clickURL:{
      type: String,
      required: true,
      default: `http://example.com/`
    },
    buttonClass:{
      type: String,
      required: false,
      default: ''
    },
    titleText: {
      type: String,
      required: true,
      default: 'like'
    }
  }
}
</script>