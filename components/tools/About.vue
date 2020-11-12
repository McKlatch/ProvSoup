<template>
  <div class="flex text-center pointer-events-auto">
    <p class="flex-1 font-body text-xs m-auto md:mt-2 p-2 md:rounded-r-lg">Proverbs curated by&nbsp;<a rel="noopener noreferrer" :href="link" target="_blank" aria-disabled="false" class="" title="David McClatchey">@McKlatch</a></p>
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
  background-color: #264653;
}
a {
  color: #EB8970
}
a:hover {
  color: #F7BF92
}
</style>