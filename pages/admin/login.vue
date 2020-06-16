<template>
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div class="max-w-sm rounded overflow-hidden shadow-md pointer-events-auto p-4">
      <!-- component -->
<form @submit.prevent="submitPressed">
  <div class="mb-4">
    <label class="block text-md font-light mb-2" for="email">Email</label>
    <input v-model="email" v-focus class="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="email" id="" placeholder="Email">
  </div>
  <div class="mb-4">
    <label class="block text-md font-light mb-2" for="password">Password</label>
    <input v-model="password" class="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="" placeholder="Password">
  </div>

  <div class="flex items-center justify-between mb-5">
    <button class="bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
      LOGIN
    </button>
    <a class="inline-block align-baseline font-light text-sm text-indigo-600 hover:text-indigo-500" href="#">
      Forgot Password?
    </a>
  </div>
  <p v-if="!error" class="text-center text-md font-light">Don't have an account? <a class="font-light text-md text-indigo-600">Create</a></p>
  <p v-if="error" class="text-center text-md font-light">{{error.message}}</p>
</form>
  </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    data() {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      submitPressed() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(data => {
          this.$router.push('/admin')
        }).catch(error => this.error = error)
      }
    },
    layout: 'admin'
  }
</script>

<style scoped>
  
</style>