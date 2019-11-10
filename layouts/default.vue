<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
  export default {
    head () {
        return {
            bodyAttrs: {
                class: 'container mx-auto w-screen h-screen bg-gray-100'
            }
        }
    }
}
</script>