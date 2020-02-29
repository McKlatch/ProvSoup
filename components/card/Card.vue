<template>
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div class="max-w-sm rounded overflow-hidden shadow-md pointer-events-auto">
      <card-top :label="label" :proverb="proverb"/>
      <card-body :label="label" :origin="origin" :proverb="proverb" />
      <card-bottom :label="label" :origin="origin" :proverb="proverb" :source="source" />
    </div>
  </div>
</template>

<script>
import CardTop from '~/components/card/CardTop'
import CardBody from '~/components/card/CardBody'
import CardBottom from '~/components/card/CardBottom'

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
    }
  },
  components: {
    CardTop, CardBody, CardBottom
  }
}
</script>