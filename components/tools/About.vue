<template>
  <div class="flex text-center pointer-events-auto">
    <p class="flex-1 font-body text-gray-700 text-xs m-auto">Proverbs curated by <a rel="noopener noreferrer" :href="link" target="_blank" aria-disabled="false" class="hover:text-pink-600" title="David McClatchey">@McKlatch</a></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      link: 'http://j.mp/PSMcKHi'
    }
  }
}
</script>