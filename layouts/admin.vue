<template>
  <div>
    <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">

      <!-- Logo - shows always -->
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <logo class="m-1 w-8" />
      </div>

      <!-- Menu Button - shows when NOT large -->
      <div class="sm:block md:block lg:hidden">
        <button @click="expandNav = !expandNav" class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
        </button>
      </div>

      <!-- Menu Items - Shows when large ONLY -->
      <div class="hidden w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <!-- admin button -->
        <div class="text-sm lg:flex-grow">
          <a v-if="$route.name != 'admin' && loggedIn" @click="$router.push('/admin/')" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">Admin</a>
        </div>
        <!-- logout button -->
        <div>
          <a v-if="loggedIn" @click="logout" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 cursor-pointer">Logout</a>
        </div>
      </div>

      <!-- shows when expandnav -->
      <div v-if="expandNav" class="w-full block flex-grow lg:hidden">
        <!-- admin button -->
        <div class="text-sm">
          <a v-if="$route.name != 'admin' && loggedIn" @click="$router.push('/admin/')" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">Admin</a>
        </div>
        <!-- logout button -->
        <div>
          <a v-if="loggedIn" @click="logout" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 cursor-pointer">Logout</a>
        </div>
      </div>

    </nav>
    <nuxt />
  </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/auth'

import Cookies from 'js-cookie'

import Logo from '~/components/Logo'
import Social from '~/components/Social'

export default {
  data() {
    return {
      loggedIn: false,
      expandNav: false
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/')
      })
    },
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.loggedIn = true
          firebase.auth().currentUser.getIdToken(true).then(token => {
            Cookies.set('access_token', token, { secure: true })
          })
        } else {
          this.loggedIn = false
          Cookies.remove('access_token')
        }
      })
    }
  },
  mounted() {
    this.setupFirebase()
  },
  components: {
    Logo,
    Social
  },
  middleware: ['auth'],
  head() {
    return {
      bodyAttrs: {
        class: 'w-screen h-screen bg-gray-100'
      }
    }
  }
}

</script>
