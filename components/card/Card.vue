<template>
    <div class="rounded overflow-hidden shadow-md pointer-events-auto">
      <card-top :quote="quote" />
      <card-body :quote="quote" />
      <card-bottom :quote="quote" />
    </div>
</template>

<script>
  import * as firebase from 'firebase/app'
import 'firebase/firestore'

import CardTop from '~/components/card/CardTop'
import CardBody from '~/components/card/CardBody'
import CardBottom from '~/components/card/CardBottom'

export default {
  props: {
    quote: {
      type: Object,
      required: true,
      default: {
        tags: [],
        contributor: 'proverb contributor',
        id: 'NotLoaded',
        created: new firebase.firestore.Timestamp(),
        imageURL: '',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      }
    }
  },
  components: {
    CardTop, CardBody, CardBottom
  }
}
</script>