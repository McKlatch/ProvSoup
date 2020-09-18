// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app"

// Add the Firebase services that you want to use
import "firebase/auth"
import "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NUXT_ENV_FB_APIKEY,
  authDomain: process.env.NUXT_ENV_FB_AUTHDOMAIN,
  databaseURL: process.env.NUXT_ENV_FB_DATABASEURL,
  projectId: process.env.NUXT_ENV_FB_PROJECTID,
  storageBucket: process.env.NUXT_ENV_FB_STORAGEBUCKET,
  messagingSenderId: process.env.NUXT_ENV_FB_MESSAGINGSENDERID,
  appId: process.env.NUXT_ENV_FB_APPID,
  measurementId: process.env.NUXT_ENV_FB_MEASUREMENTID
}

// Initialize Firebase
let app = null
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig)
}

export default firebase