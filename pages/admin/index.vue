<template>
  <div class="flex items-center justify-center">
    <div class="w-full rounded overflow-hidden shadow-md pointer-events-auto">
      <div class="bg-white overflow-hidden border-b-4 border-blue-500">
  <div class="p-4 md:p-6">
    <p class="text-blue-500 font-semibold text-xs mb-1 leading-none">Admin Area</p>
    <h3 class="font-semibold text-xl leading-tight sm:leading-normal">Do all the things</h3>
    <list class="pt-4" />
    <button @click="$router.push('/admin/new')" class="w-1/4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
      New
    </button>
  </div>
</div>
  </div>
  </div>
</template>

<script>
  import List from '~/components/list/List'

  export default {
    components: {
      List
    },
    layout: 'admin'
  }
</script>

<style scoped>
  
</style>