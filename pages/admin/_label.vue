<template>
  <div class="flex flex-wrap pt-4">
    <editor :quote="quote" class="w-full" />
  </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import Card from '~/components/card/Card'
import Editor from '~/components/editor/Editor'

export default {
  validate ({ params }) {
    // Must be a number
    return /^[A-Z].*/.test(params.label)
  },
  head() {
    return {
      title: `Editing · ${this.quote.text}`,
    }
  },
  components: {
    Card, Editor
  },
  data() {
    return {
      quote: {
        tags: [],
        contributor: 'proverb contributor',
        id: 'NotLoaded',
        created: new firebase.firestore.Timestamp(),
        imageURL: 'image URL',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      }
    }
  },
  created() {
    this.quote = this.$store.getters.getQuoteByLabel(this.$route.params.label)
  },
  layout: 'admin'
}
</script>