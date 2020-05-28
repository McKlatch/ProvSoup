<template>
  <div class="inline-flex w-full hover:bg-teal-100" @click="$router.push(`/admin/${quote.id}/`)">
    <div class="">
      <img
        :alt="quote.id"
        :src="quote.imageURL"
        class="h-24 w-24"
      />
    </div>
    <div class="flex-1 px-4 py-1">
      <h3 class="font-semibold text-black">{{ quote.id }}</h3>
      <p>
       {{ quote.text}}
      </p>
    </div>
    <div v-if="quote.published" class="italic px-4 self-center "><i class="las la-check"></i></div>
    <div v-if="!quote.published" class="italic px-4 self-center "><i class="las la-lock"></i></div>
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
        imageURL: 'image URL',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      }
    }
  }
}
</script>