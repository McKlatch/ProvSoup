// import * as firebase from 'firebase/app'
// import 'firebase/firestore'

export const state = () => ({
  inQuotes: []
})

export const mutations = {
  setQuotes(state, quotes) {
    state.inQuotes = quotes
  }
}

export const actions = {
  async nuxtServerInit(vuexContext, context) {
    const quoteQuery = await this.$axios.$get('https://api.sheety.co/28999f15-3e1a-47f2-83e2-619d2b8e1287')
    vuexContext.commit('setQuotes', quoteQuery)

    // const quotesQuery = await firebase.firestore().collection('quotes').orderBy('created').get()
    // .then((res) => {
    //   const quotesArray = []
    //   res.forEach((doc) => {
    //     quotesArray.push(doc.data())
    //   })
    //   return quotesArray
    // })
    // .catch(e => context.error(e))
    // vuexContext.commit('setQuotes', quotesQuery)
  },
  setQuotes(vuexContext, quotes) {
    vuexContext.commit('setQuotes', quotes)
  }
}

export const getters = {
  inQuotes(state) {
    return state.inQuotes
  },
  readyQuotes(state) {
    return state.inQuotes.filter(function(index) {
      return index.label;
    })
  },
  randomQuote(state, getters) {
    const rand = Math.floor(Math.random() * getters.readyQuotes.length)
    const selected = getters.readyQuotes[rand]
    return selected
  },
  getQuoteByLabel: (state, getters) => label => {
    return getters.readyQuotes.find(quote => quote.label === label)
  }
}