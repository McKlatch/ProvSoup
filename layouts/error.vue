<template>
  <div class="container">
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="max-w-sm rounded overflow-hidden shadow-md pointer-events-auto p-4 bg-gray-200">
        <h1 v-if="statusCode === 404" class="text-xl text-center text-gray-900">Page not found</h1>
        <h1 v-else class="text-xl text-center text-gray-900">An error occurred</h1>
        <nuxt-link to="/" class="flex items-center justify-between mt-3">
          <button class="bg-teal-500 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline mx-auto" type="submit">
            Go Home
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    },
    message() {
      return this.error.message
    }
  },
  head() {
    return {
      title: this.message,
      meta: [{
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0'
      }]
    }
  }
}

</script>
