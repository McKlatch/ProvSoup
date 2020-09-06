<template>
  <p class="hidden lg:flex text-center text-xs font-body p-1">&quot;{{quote.text}}&quot; - {{quote.contributor}}{{textColorBW}}</p>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/firestore'

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
        imageURL: 'image URL',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      }
    }
  },
  data() {
    return {
      textColorBW: ''
    }
  },
  mounted() {
    this.textColorBW = document.getElementById("panelBG").style.backgroundColor
    console.log(document.getElementById("panelBG"))
  }
}
</script>