<template>
  <div class="flex bg-gray-100 pointer-events-auto">
    <i v-if="soupContext.earliest" @click="$router.push(`/${soupContext.earliest}`)" class="flex-1 las la-angle-double-left cursor-pointer text-center m-auto" title="First"></i>
    <i v-if="soupContext.last" @click="$router.push(`/${soupContext.last}`)" class="flex-1 las la-angle-left cursor-pointer text-center m-auto" title="Previous"></i>
    <i @click="$router.push(`/${randomQuoteLabel}`)" class="flex-1 las la-random cursor-pointer text-center m-auto" title="Random"></i>
    <i v-if="soupContext.next" @click="$router.push(`/${soupContext.next}`)" class="flex-1 las la-angle-right cursor-pointer text-center m-auto" title="Next"></i>
    <i v-if="soupContext.latest" @click="$router.push(`/${soupContext.latest}`)" class="flex-1 las la-angle-double-right cursor-pointer text-center m-auto" title="Latest"></i>
  </div>
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
        imageURL: '',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      }
    }
  },
  data() {
    return {
      soupContext: {
        earliest: '',
        last: '',
        next: '',
        latest: ''
      }
    }
  },
  computed: {
    randomQuoteLabel() {
      let randomID
      do {
        randomID = this.$store.getters.randomQuoteID(Math.floor(Math.random() * this.$store.getters.quotesCount))
      } while (randomID == this.quote.id)
      return randomID
    }
  },
  created() {
    const quotesArray = this.$store.getters.quotes
    const quotesTarget = quotesArray.findIndex(x => x.id === this.quote.id)
    this.soupContext = {
      earliest: quotesArray[0].id != this.quote.id ? quotesArray[0].id : '',
      last: quotesArray[quotesTarget - 1] ? quotesArray[quotesTarget - 1].id : '',
      next: quotesArray[quotesTarget + 1] ? quotesArray[quotesTarget + 1].id : '',
      latest: quotesArray[quotesArray.length - 1].id != this.quote.id ? quotesArray[quotesArray.length - 1].id : ''
    }
  }
}

</script>
<style>
  i {
    color: #777;
    font-style: normal;
    font-size: 30px;
  }
  i:hover {
    color: #6b46c1;
    font-style: normal;
    font-size: 34px;
  }
</style>