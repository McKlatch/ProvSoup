import * as firebase from 'firebase/app'
import 'firebase/auth'

import jwtDecode from 'jwt-decode'
let cookieparser = require('cookieparser')

function getUserFromCookie(req) {
  if (process.server && process.static) return
  if (!req.headers.cookie) return

  if (req.headers.cookie) {
    const parsed = cookieparser.parse(req.headers.cookie)
    const accessTokenCookie = parsed.access_token
    if (!accessTokenCookie) return

    const decodedToken = jwtDecode(accessTokenCookie)
    if (!decodedToken) return

    return decodedToken
  }
}

function redirectToLogin(context) {
  context.store.dispatch('redirect/setPath', context.route.path)
  context.redirect('/admin/login')
}

export default function(context) {
  if (process.server) {
    const user = getUserFromCookie(context.req)
    if (!user) {
      redirectToLogin(context)
    }
  } else {
    let user = firebase.auth().currentUser
    if (!user) {
      redirectToLogin(context)
    }
  }
}

// export default function(context) {
//   firebase.auth().onAuthStateChanged(user => {
//     if (!user) {
//       console.log('firebase.auth() no current user')
//       context.redirect('/admin/login')
//     }
//     if (!context.store.getters['token/verifyToken']) {
//       console.log('verifytoken: false ' + context.store.getters.getToken)
//       context.redirect('/admin/login')
//     }
//   })
//   // redirect all (temporary)
//   context.redirect('/admin/login')
// }