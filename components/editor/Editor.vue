<template>
  <FormulateForm @submit="update">
    <div class="flex flex-wrap">
    <div class="w-full md:w-1/2">
    <FormulateInput
      v-if="!imagePresent"
      type="image"
      name="image"
      label="Select an image to upload"
      help="Select a png or jpg to upload (1080px x 1080p)"
      validation="mime:image/jpeg,image/png"
      :uploader="uploadFile"
      :error="uploadError"
    />
    <div v-else class="mb-6">
      <label for="imageSample" class="font-medium">Image</label>
      <img @click="imagePresent = false" :src="editQuote.imageURL" :alt="editQuote.imageURL" width="100" height="100" name="imageSample" class="my-1 hover:opacity-50">
      <div class="text-xs text-gray-700">Click to replace</div>
    </div>
    <FormulateInput
      v-model="editQuote.text"
      type="textarea"
      name="text"
      label="Proverb Text"
      placeholder="Always do your best..."
      help="Punctuation must match image"
      validation="required"
    />
    <FormulateInput
      v-model="editQuote.contributor"
      type="text"
      name="contributor"
      label="Proverb Author/Contributor"
      placeholder="Your Name"
      help="Sample help text"
      validation="required"
    />
    </div>
    <div class="w-full md:w-1/2">
    <FormulateInput
      v-model="editQuote.id"
      type="text"
      name="id"
      label="Proverb ID/Shorthand/Slug"
      help="This can NOT be changed later"
      validation="required"
      :disabled="!isNew"
    />
    <FormulateInput
      v-model="editQuote.citation"
      type="text"
      name="citation"
      label="Proverb source/citation"
      placeholder="e.g. Book/Film Title"
    />
    <FormulateInput
      v-model="showTags"
      type="textarea"
      name="text"
      label="Tags"
      placeholder="Tag1, Tag2, Tag3"
      help="Comma separated, list 8-30 tags"
    />
    </div>
    </div>
    </div>
    <div class="flex">
    <div class="w-1/3 mb-6">
    <div class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in my-1">
      <input v-model="editQuote.published" type="checkbox" name="published" id="published" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
      <label for="published" class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
    </div>
    <label for="published" class="font-medium">Live?</label>
    </div>
    <FormulateInput
      type="submit"
      :name="isNew ? 'Submit' : 'Update'"
      class="w-1/3"
    />
    <FormulateInput
      v-if="!isNew"
      @click="remove"
      type="button"
      label="Delete"
      class="w-1/3"
    />
    <FormulateInput
      v-else
      @click="forgetImage"
      type="button"
      label="Forget"
      class="w-1/3"
    />
    </div>
  </FormulateForm>
</template>
<script>
import '@/assets/css/snow.min.css'

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
      imagePresent: false
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
        this.uploadError = error
      }, () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.editQuote.imageURL = downloadURL
        })
      })
    },
    async uploadFile (file, progress, error, option) {
      const storageRef = firebase.storage().ref(file.name)
      const task = storageRef.put(file)
      return await task.on('state_changed', snapshot => {
        progress((task.snapshot.bytesTransferred / task.snapshot.totalBytes) * 100)
      }, error => {
        this.uploadError = error
      }, () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.editQuote.imageURL = downloadURL
        })
      })
    },
    updateProgressBar(snapshot) {
      this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
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
.toggle-checkbox:checked + .toggle-label {
  @apply: bg-green-400;
  background-color: #68D391;
}
</style>
