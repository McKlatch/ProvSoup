<template>
  <div class="flex flex-wrap bg-pink-200 pointer-events-auto">
    <p class="hidden lg:flex text-center text-xs font-body p-1">&quot;{{quote.text}}&quot; - {{quote.contributor}}</p>
    <LinkIcon
      v-for="social in socials"
      :quote="quote" :social="social" :key="social"
      class="flex-1 text-center m-auto" 
    />
  </div>
</template>

<script>
import * as firebase from 'firebase/app'
import 'firebase/firestore'

import SocialButton from '~/components/card/Button'

export default {
  props: {
    quote: {
      type: Object,
      required: true,
      default: {
        tags: [],
        contributor: 'proverb contributor',
        id: 'NotLoaded',
        created: new firebase.firestore.Timestamp(),
        imageURL: 'image URL',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      }
    }
  },
  data() {
    return {
      socialIconClass: 'm-2 mt-2',
      socialIconButton: 'bg-gray-300 hover:bg-gray-400 h-full',
      socials: ['facebook',
        'twitter',
        'tumblr',
        'email',
        'pinterest',
        'linkedin',
        'reddit',
        'whatsapp',
        'copylink', 'copyproverb', 'discover']
    }
  },
  computed: {
    discoverLink() {
      if (this.validURL(this.quote.citation)) return this.quote.citation
      // if (this.validBibleRef(this.quote.contributor)) return `http://www.biblegateway.com/passage/?search=${this.quote.contributor}&version=WEB`
      let queryText = ''
      if (!this.quote.contributor.toLowerCase().includes("unknown")) queryText += `${this.quote.contributor} `
      if (this.quote.citation && this.quote.citation !== this.quote.contributor) {
        if (!this.quote.citation.toLowerCase().includes("unknown")) queryText += `${this.quote.citation} `
      }
      queryText += this.quote.text
      return `https://ecosia.org/search?q=${queryText}`
    }
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(`https://proverbialsoup.com/${this.quote.id}`)
    },
    copyProverb() {
      navigator.clipboard.writeText(`"${this.quote.text}" - ${this.quote.contributor}`)
    },
    validURL(i) {
      const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*') // port and path
      return pattern.test(i)
    },
    validBibleRef(i) {
      const pattern = new RegExp('([\d ]*[a-zA-Z]+( \d*:\d*)?)(( - )| )?(((\d* )?[a-zA-Z]+ )?\d*([:-]+\d*)?)') // returns everything :(
      return pattern.test(i)
    }
  },
  components: {
    SocialButton
  }
}
</script>