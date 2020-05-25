<template>
  <div>
    <logo class="absolute top-0 left-0 m-1 w-8 md:m-4 md:w-10" />
    <div class="absolute top-0 right-0 m-4">
    <button v-if="$route.name != 'admin' && loggedIn" @click="$router.push('/admin/')" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
  Admin
</button>
    <button v-if="loggedIn" @click="logout" class="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
  Logout
</button>
</div>
    <nuxt class="m-12" />
    <social class="absolute bottom-0 right-0 mr-2" />
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
      loggedIn: false
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
        if(user) {
          this.loggedIn = true
          firebase.auth().currentUser.getIdToken(true).then(token => {
            Cookies.set('access_token', token)
          })
        }
        else {
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