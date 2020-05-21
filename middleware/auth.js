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

export default function(context) {
  if (process.server) {
    const user = getUserFromCookie(context.req)
    if (!user) {
      context.redirect('/admin/login')
    }
  } else {
    let user = firebase.auth().currentUser
    if (!user) {
      context.redirect('/admin/login')
    }
  }
}