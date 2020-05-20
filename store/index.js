import * as firebase from 'firebase/app'
import 'firebase/firestore'

export const state = () => ({
  quotes: []
})

export const mutations = {
  setQuotes(state, quotes) {
    state.quotes = quotes
  }
}

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    const quotesQuery = await firebase.firestore().collection('quotes').orderBy('created').get()
    .then((res) => {
      const quotesArray = []
      res.forEach((doc) => {
        quotesArray.push(doc.data())
      })
      return quotesArray
    })
    .catch(e => context.error(e))
    vuexContext.commit('setQuotes', quotesQuery)
  },
  setQuotes(vuexContext, quotes) {
    vuexContext.commit('setQuotes', quotes)
  }
}

export const getters = {
  getQuoteByLabel: (state, getters) => label => {
    return getters.quotes.find(quote => quote.id === label)
  },
  quotes(state) {
    return state.quotes
  },
  randomQuoteID: (state, getters) => seed => {
    return getters.quotes[seed].id
  },
  quotesCount(state, getters) {
    return getters.quotes.length
  }
}