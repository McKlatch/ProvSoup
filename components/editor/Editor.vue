<template>
  <form @submit="update" class="container mx-auto">
    <!-- main form - 2 columns -->
    <div class="flex flex-wrap">
      <!-- left column -->
      <div class="w-full sm:w-1/2 px-2">
        <div v-if="!imagePresent" class="mb-6">
          <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white my-6">
            <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="image" class="rounded-t bg-gray-200 text-gray-700 px-1">Image</label>
              </p>
            </div>
            <p>
              <input @change="uploadFileOld" id="image" type='file' accept="image/png,image/jpeg" />
            </p>
            <span class="bg-gray-200 rounded px-1 text-xs text-gray-700 float-right">Select a png or jpg to upload (1080px x 1080px)</span>
            <span v-show="uploadError" class="bg-gray-200 rounded px-1 text-xs text-red-700 float-right">{{ uploadError }}</span>
          </div>
        </div>
        <div v-if="imagePresent" class="mb-6">
          <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white my-6">
            <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label for="imageSample" class="rounded-t bg-gray-200 text-gray-700 px-1">Image</label>
              </p>
            </div>
            <div class="flex">
            <img :src="editQuote.imageURL" :alt="editQuote.imageURL" width="100" height="100" name="imageSample" class="flex-initial my-1">
            <button type="button" @click="imagePresent = false" class="rounded text-red-500 h-10 px-3 py-1 border border-red-500 hover:shadow-inner hover:bg-red-700 hover:text-red-100 transition-all duration-300">Change Image</button>
            </div>
            <span class="bg-gray-200 rounded px-1 text-xs text-gray-700 float-right">Click to replace</span>
          </div>
        </div>
        <!-- text field -->
        <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white my-6">
          <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
            <p>
              <label for="text" class="rounded-t bg-gray-200 text-gray-700 px-1">Proverb Text</label>
            </p>
          </div>
          <p>
            <textarea @click="$event.target.select()" v-model="editQuote.text" id="text" autocomplete="false" tabindex="0" placeholder="Always do your best..." class="-mb-1 py-1 px-1 text-gray-900 outline-none block h-full w-full" rows="2" required></textarea>
          </p>
          <span class="-mt-3 -mr-1 bg-gray-200 rounded px-1 text-xs text-gray-700 float-right">Punctuation should match image</span>
        </div>
        <!-- author field -->
        <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white my-6">
          <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
            <p>
              <label for="contributor" class="rounded-t bg-gray-200 text-gray-700 px-1">Proverb Author/Contributor</label><span @click="editQuote.contributor = 'Unknown'" class="bg-teal-300 px-1 cursor-pointer ml-5">Unknown</span>
            </p>
          </div>
          <p>
            <input @click="$event.target.select()" v-model="editQuote.contributor" id="contributor" autocomplete="false" tabindex="0" type="text" placeholder="Name" class="-mb-1 py-1 px-1 text-gray-900 outline-none block h-full w-full" required>
          </p>
          <span class="-mt-3 -mr-1 bg-gray-200 rounded px-1 text-xs text-gray-700 float-right">Who said/wrote this</span>
        </div>
      </div>
      <!-- right column -->
      <div class="w-full sm:w-1/2 px-2">
        <!-- id field -->
        <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white my-6">
          <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
            <p>
              <label for="id" class="rounded-t bg-gray-200 text-gray-700 px-1">Proverb ID/Shorthand/Slug</label>
            </p>
          </div>
          <p>
            <input @click="$event.target.select()" v-model="editQuote.id" id="id" autocomplete="false" tabindex="0" type="text" placeholder="Always do your best..." class="-mb-1 py-1 px-1 text-gray-900 outline-none block h-full w-full" rows="2" required :disabled="!isNew">
          </p>
          <span class="-mt-3 -mr-1 bg-gray-200 rounded px-1 text-xs text-gray-700 float-right">4 words in CamelCase - This can NOT be changed later</span>
        </div>
        <!-- citation field -->
        <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white my-6">
          <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
            <p>
              <label for="citation" class="rounded-t bg-gray-200 text-gray-700 px-1">Proverb source/citation</label><span @click="editQuote.citation = 'Unknown'" class="bg-teal-300 px-1 cursor-pointer ml-5">Unknown</span>
            </p>
          </div>
          <p>
            <input @click="$event.target.select()" v-model="editQuote.citation" id="citation" autocomplete="false" tabindex="0" type="text" placeholder="e.g. Book/Film Title" class="-mb-1 py-1 px-1 text-gray-900 outline-none block h-full w-full">
          </p>
          <span class="-mt-3 -mr-1 bg-gray-200 rounded px-1 text-xs text-gray-700 float-right">Where there is evidence for this contributor stating this proverb</span>
        </div>
        <!-- tags field -->
        <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white my-6">
          <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
            <p>
              <label for="tags" class="rounded-t bg-gray-200 text-gray-700 px-1">Tags [{{ editQuote.tags.length }}]</label><span v-if="editQuote.text.length > 12" @click="fetchTags" class="bg-teal-300 px-1 cursor-pointer ml-5"><i class="las la-magic"></i></span><span v-if="fetchTagsError" class="text-teal-500">{{ fetchTagsError }}</span>
            </p>
          </div>
          <p>
            <textarea v-model.trim="showTags" id="tags" autocomplete="false" tabindex="0" placeholder="Tag1, Tag2, Tag3" class="-mb-1 py-1 px-1 text-gray-900 outline-none block h-full w-full" rows="3" required></textarea>
          </p>
          <span class="-mt-3 -mr-1 bg-gray-200 rounded px-1 text-xs text-gray-700 float-right">Space separated, special characters autoremoved, list 8-30 tags.</span>
        </div>
        <!-- checkbox switch -->
      <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white my-6">
        
        <!-- <label for="published" class="font-medium">Live?</label> -->
        <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
          <p>
            <label for="published" class="rounded-t bg-gray-200 text-gray-700 px-1">live</label>
          </p>
        </div>
        <p>
        <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in my-1">
          <input v-model="editQuote.published" type="checkbox" name="published" id="published" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
          <label for="published" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
      </p>
      <span class="bg-gray-200 rounded px-1 text-xs text-gray-700 float-right">Toggle to publish/unpublish</span>
      </div>
      </div>
    </div>
    <!-- button row - below main form -->
    <div class="flex border-t pt-3 px-2">
      <!-- preview toggles -->
      <div class="flex-1 flex">
      <p v-if="!tweetPreview" @click="tweetPreview = !tweetPreview" class="text-5xl -mt-4 text-gray-500"><i class="lab la-twitter" style="font-style:normal;"></i></p>
      <p v-else @click="tweetPreview = !tweetPreview" class="text-5xl -mt-4 text-teal-500"><i class="lab la-twitter" style="font-style:normal;"></i></p>
      <p v-if="!instaPreview" @click="instaPreview = !instaPreview" class="text-5xl -mt-4 text-gray-500"><i class="lab la-instagram" style="font-style:normal;"></i></p>
      <p v-else @click="instaPreview = !instaPreview" class="text-5xl -mt-4 text-teal-500"><i class="lab la-instagram" style="font-style:normal;"></i></p>
      </div>
      <!-- submit button -->
      <button type="submit" class="rounded text-blue-100 h-10 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 transition-all duration-300 float-right">
        {{ isNew ? 'Submit' : 'Update' }}
      </button>
      <!-- remove button -->
      <button v-if="!isNew" type="button" @click="remove" class="rounded text-red-500 h-10 px-3 py-1 border border-red-500 hover:shadow-inner hover:bg-red-700 hover:text-red-100 transition-all duration-300 float-right">
        Delete
      </button>
      <!-- forget button -->
      <button v-if="isNew" type="button" @click="forgetImage" class="rounded text-red-500 h-10 px-3 py-1 border border-red-500 hover:shadow-inner hover:bg-red-700 hover:text-red-100 transition-all duration-300 float-right">
        Forget
      </button>
    </div>
    <!-- previews -->
    <p v-if="tweetPreview || instaPreview" class="text-xs text-gray-700">Click to copy text for social media</p>
    <div v-if="showPreviews" class="flex flex-wrap">
      <TweetPreview v-if="tweetPreview" :quote="editQuote" class="w-64 sm:w-5/12 mb-auto" />
      <InstaPreview v-if="instaPreview" :quote="editQuote" class="w-64 sm:w-5/12 mb-auto" />
    </div>
  </form>
</template>
<script>
// import '@/assets/css/snow.min.css'

import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

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
      },
      uploadProgress: 0,
      uploadError: '',
      imagePresent: false,
      fetchTagsError: '',
      tweetPreview: false,
      instaPreview: false
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
        imageURL: '',
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
    this.imagePresent = this.editQuote.imageURL !== ""
  },
  computed: {
    showTags: {
      // for display in textarea ui
      get() {
        return this.editQuote.tags.join(' ')
      },
      set(str) {
        this.editQuote.tags = str.replace(/[!@#$%^&*,.]/g, '').split(' ')
      }
    },
    sendString() {
      // for sending to hashtag generator api
      let words = this.editQuote.text
      let wordsLen = words.length

      while (wordsLen > 1000) {
        words = words.substring(0, words.lastIndexOf(' '))
        wordsLen = words.length
      }
      
      return escape(words)
    },
    showPreviews() {
      return this.tweetPreview || this.instaPreview
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
      let result = confirm("Are you sure?");
      if (result) {
        this.$store.dispatch('deleteQuote', this.quote)
          .then(() => {
            this.forgetImage
          })
      }
    },
    forgetImage() {
      if (this.editQuote.imageURL) {
        const storage = firebase.storage()
        const storageRef = storage.refFromURL(this.editQuote.imageURL)
        storageRef.delete().then(() => {
          this.$router.push('/admin')
        }).catch(error => {
          console.log('Uh-oh, an error occurred!', error.message)
        })
      } else { this.$router.push('/admin') }
    },
    uploadFileOld(e) {
      const file = e.target.files[0]
      const storageRef = firebase.storage().ref(file.name)
      const task = storageRef.put(file)
      task.on('state_changed', snapshot => {
        this.updateProgressBar(task.snapshot)
      }, error => {
        this.uploadError = error.message
      }, () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.editQuote.imageURL = downloadURL
          this.imagePresent = true
        })
      })
    },
    async uploadFile(file, progress, error, option) { // this was made for vueformulate input (not good with tailwindcss)
      const storageRef = firebase.storage().ref(file.name)
      const task = storageRef.put(file)
      return await task.on('state_changed', snapshot => {
        progress((task.snapshot.bytesTransferred / task.snapshot.totalBytes) * 100)
      }, error => {
        this.uploadError = error.message
      }, () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.editQuote.imageURL = downloadURL
          this.imagePresent = true
        })
      })
    },
    updateProgressBar(snapshot) {
      this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    },
    async fetchTags() {
      let suggestTags = []
      await this.$axios.$get(`https://api.ritekit.com/v1/stats/hashtag-suggestions?text=${this.sendString}`, {
        params : {
          'client_id' : process.env.NUXT_ENV_RK_CLIENTID
        }
      })
        .then(response => {
          response.data.forEach(suggestion => {
            suggestTags.push(suggestion.hashtag)
          })
          this.editQuote.tags = (this.editQuote.tags.concat(suggestTags))
        })
        .catch(error => this.fetchTagsError = error)
    }
  }
}

</script>
<style scoped>
/* CHECKBOX TOGGLE SWITCH */
/* @apply rules for documentation, these do not work as inline style */
.toggle-checkbox:checked {
  @apply: right-0 border-green-400;
  right: 0;
  border-color: #68D391;
}

.toggle-checkbox:checked+.toggle-label {
  @apply: bg-green-400;
  background-color: #68D391;
}

</style>
