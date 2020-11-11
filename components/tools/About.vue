<template>
  <div class="flex text-center pointer-events-auto">
    <p class="flex-1 font-body text-xs m-auto pt-2 px-2">Proverbs curated by&nbsp;<a rel="noopener noreferrer" :href="link" target="_blank" aria-disabled="false" class="" title="David McClatchey">@McKlatch</a></p>
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
<style scoped>
p {
  color: #EB8970;
  filter: drop-shadow(.05em .05em #00637E)
}
a {
  color: #EB8970
}
a:hover {
  color: #F7BF92
}
</style>