<template>
  <div class="flex flex-wrap pt-4">
    <editor :quote="quote" class="w-full" isNew />
  </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  head() {
    return {
      title: `Creating · ${this.quote.text}`,
    }
  },
  data() {
    return {
      quote: {
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
  layout: 'admin'
}
</script>