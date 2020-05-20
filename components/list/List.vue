<template>
  <div>
    <list-item v-for="quote in quotes" :quote="quote" :key="quote.id" />
  </div>
</template>

<script>
  import ListItem from '~/components/list/ListItem'

  export default {
    data() {
      return {
        quotes: []
      }
    },
    created() {
      this.quotes = this.$store.getters.quotes
    },
    components: {
      ListItem
    }
  }
</script>