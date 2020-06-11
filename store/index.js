import * as firebase from 'firebase/app'
import 'firebase/firestore'

export const state = () => ({
  quotes: []
})

export const mutations = {
  setQuotes(state, quotes) {
    state.quotes = quotes
  },
  addQuote(state, quote) {
    state.quotes.push(quote)
  },
  updateQuote(state, quote) {
    const index = state.quotes.findIndex(i => i.id == quote.id)
    state.quotes[index] = quote
  },
  deleteQuote(state, quote) {
    const index = state.quotes.findIndex(i => i.id == quote.id)
    state.quotes.splice(index, 1)
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
  },
  addQuote(vuexContext, quote) {
    return firebase.firestore().collection('quotes')
    .add(quote)
    .then(data => {
      vuexContext.commit('addQuote', quote)
    })
    .catch(e => console.log(e))
  },
  updateQuote(vuexContext, quote) {
    const query = firebase.firestore().collection('quotes').where('id', '==', quote.id)
    let postID
    return query.get()
    .then(res => {
      res.forEach(doc => {
        postID = doc.id
      })
    })
    .then(res => {
      firebase.firestore().collection('quotes').doc(postID).update(quote)
    })
    .then(res => {
      vuexContext.commit('updateQuote', quote)
    })
    .catch(e => console.log(e))
  },
  deleteQuote(vuexContext, quote) {
    const query = firebase.firestore().collection('quotes').where('id', '==', quote.id)
    let postID
    return query.get()
    .then(res => {
      res.forEach((doc) => {
        postID = doc.id
      })
    })
    .then(res => {
      firebase.firestore().collection('quotes').doc(postID).delete()
    })
    .then(res => {
      vuexContext.commit('deleteQuote', quote)
    })
    .catch(e => console.log(e))
  }
}

export const getters = {
  getQuoteByLabel: (state, getters) => label => {
    return getters.quotesAll.find(quote => quote.id === label)
  },
  quotes(state) {
    return state.quotes.filter(quote => quote.published)
  },
  quotesAll(state) {
    return state.quotes
  },
  randomQuoteID: (state, getters) => seed => {
    return getters.quotes[seed].id
  },
  quotesCount(state, getters) {
    return getters.quotes.length
  },
  getSoupContextByLabel: (state, getters) => label => {
    const array = getters.quotes.sort(quote => quote.created)
    const target = array.findIndex(x => x.id === label)

    const earliest = array[0].id
    const latest = array[array.length - 1].id

    console.log(target - 1, target + 1)

    let last// = array[target - 1].id
    let next// = array[target + 1].id
    
    return {
      earliest,
      last,
      next,
      latest
    }
  }
}