<template>
  <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div class="max-w-sm rounded overflow-hidden shadow-md pointer-events-auto">
      <div class="bg-white overflow-hidden border-b-4 border-blue-500">
  <div class="p-4 md:p-6">
    <p class="text-blue-500 font-semibold text-xs mb-1 leading-none">Admin Area</p>
    <h3 class="font-semibold text-xl leading-tight sm:leading-normal">Do all the things</h3>
  </div>
</div>
  </div>
  </div>
</template>

<script>
  import * as firebase from 'firebase/app'
  import 'firebase/auth'

  import { getUserFromCookie } from '@/helpers'

  export default {
    asyncData({req, redirect}) {
      if (process.server) {
        const user = getUserFromCookie(req)
        if (!user) {
          redirect('/login')
        }
      } else {
        let user = firebase.auth().currentUser
        if (!user) {
          redirect('/login')
        }
      }
    },
    layout: 'admin'
  }
</script>

<style scoped>
  
</style>