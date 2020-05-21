<template>
<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-11/12 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="imgURL">
       Image URL
      </label>
      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" id="imgURL" type="text" :value="quote.imageURL"></input>
    </div>
    <div class="md:w-1/12 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="published">
       Live?
      </label>
      <input :checked="quote.published" id="published" type="checkbox">
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-full px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="text">
        Proverb Text
      </label>
      <textarea :value="quote.text" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="text" type="text"></textarea>
      <p class="text-grey-dark text-xs italic">Punctuation must match image</p>
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="contributor">
        Proverb Author/Contributor
      </label>
      <input :value="quote.contributor" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" id="contributor" type="text">
    </div>
    <div class="md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="id">
        Proverb ID/Shorthand/Slug
      </label>
      <input :value="quote.id" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="id" type="text">
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-full px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="citation">
       Proverb source/citation
      </label>
      <input :value="quote.citation" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" id="citation" type="text">
    </div>
  </div>
  <div class="-mx-3 md:flex mb-2">
    <div class="md:w-full px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="tags">
        Tags
      </label>
      <textarea :value="showTags" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="text" type="text" rows="6"></textarea>
      <p class="text-grey-dark text-xs italic">Comma separated, list 8-30 tags</p>
    </div>
  </div>
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
    },
    computed: {
      showTags() {
        return this.quote.tags.join(', ')
      }
    }
  }
</script>

<style scoped>
  
</style>