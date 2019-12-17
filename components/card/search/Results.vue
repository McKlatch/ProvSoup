<template>
  <ul class="absolute max-w-sm">
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