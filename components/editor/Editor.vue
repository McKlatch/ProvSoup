<template>
<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-11/12 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="imgURL">
       Image URL
      </label>
      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" id="imgURL" type="text" v-model="editQuote.imageURL"></input>
    </div>
    <div class="md:w-1/12 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="published">
       Live?
      </label>
      <input v-model="editQuote.published" id="published" type="checkbox">
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-full px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="text">
        Proverb Text
      </label>
      <textarea v-model="editQuote.text" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="text" type="text"></textarea>
      <p class="text-grey-dark text-xs italic">Punctuation must match image</p>
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="contributor">
        Proverb Author/Contributor
      </label>
      <input v-model="editQuote.contributor" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" id="contributor" type="text">
    </div>
    <div class="md:w-1/2 px-3">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="id">
        Proverb ID/Shorthand/Slug
      </label>
      <input v-model="editQuote.id" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="id" type="text" :disabled="!isNew">
    </div>
  </div>
  <div class="-mx-3 md:flex mb-6">
    <div class="md:w-full px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="citation">
       Proverb source/citation
      </label>
      <input v-model="editQuote.citation" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4" id="citation" type="text">
    </div>
  </div>
  <div class="-mx-3 md:flex mb-2">
    <div class="md:w-full px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="tags">
        Tags
      </label>
      <textarea v-model="showTags" class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="text" type="text" rows="6"></textarea>
      <p class="text-grey-dark text-xs italic">Comma separated, list 8-30 tags</p>
    </div>
  </div>
  <div class="flex">
  <button @click="update" class="w-3/4 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
  {{ isNew ? 'Submit' : 'Update'}}
</button>
<button v-if="!isNew" @click="remove" class="w-1/4 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
  Delete
</button>
<button v-else @click="$router.push('/admin/')" class="w-1/4 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
  Forget
</button>

</div>
</div>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/firestore'

  export default {
    data() {
      return {
        editQuote: {
          tags: [],
          contributor: '',
          id: '',
          created: new firebase.firestore.Timestamp(),
          imageURL: '',
          citation: '',
          text: '',
          published: false,
          edited: new firebase.firestore.Timestamp()
        }
      }
    },
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
      },
      isNew: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    created() {
      this.editQuote = { ...this.quote }
    },
    computed: {
      showTags: {
        get() {
          return this.editQuote.tags.join(', ')
        },
        set(str) {
          this.editQuote.tags = str.replace(/\s/g, '').split(',')
        }
      }
    },
    methods: {
      update() {
        if (!this.isNew) {
          this.editQuote.created = new firebase.firestore.Timestamp(this.editQuote.created.seconds, this.editQuote.created.nanoseconds)
        }
        if (this.isNew) {
          this.editQuote.created = new firebase.firestore.Timestamp.now()
        }
        this.editQuote.edited = new firebase.firestore.Timestamp.now()
        if (!this.isNew) {
          this.$store.dispatch('updateQuote', this.editQuote)
          .then(() => {
            this.$router.push('/admin')
          })
        }
        if (this.isNew) {
          this.$store.dispatch('addQuote', this.editQuote)
          .then(() => {
            this.$router.push('/admin')
          })
        }
      },
      remove() {
        var result = confirm("Are you sure?");
        if (result) {
          this.$store.dispatch('deleteQuote', this.quote)
          .then(() => {
            this.$router.push('/admin')
          })
        }
      }
    }
  }
</script>

<style scoped>
  
</style>