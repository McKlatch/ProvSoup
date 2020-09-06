<template>
  <ul class="absolute w-11/12 md:w-1/3 dropdown leading-tight">
    <result-display v-for="result in results" :key="result.label" :label="result.label" :showProverb="result.showProverb" :showOrigin="result.showOrigin" />
  </ul>
</template>

<script>
import ResultDisplay from '~/components/card/search/Result'

export default {
  props: {
    suggests: {
      type: Array,
      required: true,
      default: []
    }
  },
  computed: {
    results() {
      return this.suggests.slice(0, 7)
    }
  },
  components: {
    ResultDisplay
  }
}
</script>

<style>
  .dropdown li:nth-child(even) {
    background-color: #ffffffee;
  }
  .dropdown li:nth-child(odd) {
    background-color: #eeeeeeee;
  }
  .dropdown li:hover {
    background-color: #ffffff;
  }
</style>