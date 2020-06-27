<template>
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div class="max-w-sm rounded overflow-hidden shadow-md pointer-events-auto p-4 bg-gray-200">
      <!-- component -->
<form @submit.prevent="submitPressed">
  <!-- email field -->
  <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white mb-6">
    <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
      <p>
        <label for="email" class="rounded-t bg-gray-200 text-gray-700 px-1">Email</label>
      </p>
    </div>
    <p>
      <input v-model="email" v-focus id="email" autocomplete="false" tabindex="0" type="text" placeholder="your@email.address" class="-mb-1 py-1 px-1 text-gray-900 outlineblock h-full w-full" required>
    </p>
  </div>
  <!-- password field -->
  <div class="border focus-within:border-blue-500 relative rounded p-1 bg-white my-6">
    <div class="-mt-4 -ml-2 absolute tracking-wider px-1 uppercase text-xs">
      <p>
        <label for="password" class="rounded-t bg-gray-200 text-gray-700 px-1">Password</label>
      </p>
    </div>
    <p>
      <input v-model="password" id="password" autocomplete="false" tabindex="0" type="password" placeholder="*******" class="-mb-1 py-1 px-1 text-gray-900 outlineblock h-full w-full" required>
    </p>
  </div>
  <div class="flex items-center justify-between mb-3 -mt-1">
    <button class="bg-teal-500 hover:bg-teal-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline mx-auto" type="submit">
      Login
    </button>
  </div>
  <p v-if="!error" class="text-sm text-center text-gray-700">This website uses cookies, only after login.</p>
  <p v-if="error" class="text-sm text-center text-red-700">{{error.message}}</p>
</form>
  </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/auth'

  import Cookies from 'js-cookie'

  export default {
    data() {
      return {
        email: '',
        password: '',
        error: '',
        redirect: ''
      }
    },
    methods: {
      submitPressed() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {
          firebase.auth().currentUser.getIdToken(true).then(token => {
            Cookies.set('access_token', token, { secure: true })
          })
          if (this.redirect != '') {
            this.$router.push(`/admin/${this.redirect}`)
          } else {
            this.$router.push('/admin')
          }
        }).catch(error => this.error = error)
      }
    },
    created() {
      if (this.$route.query.d) {
        this.redirect = this.$route.query.d
      }
    }
    // layout: 'admin'
  }
</script>

<style scoped>
  
</style>