<template>
  <div class="cursor-pointer">
    <a v-if="social == 'facebook'" :href="facebookURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Share on Facebook">
      <i class="lab la-facebook facebook"></i>
    </a>
    <a v-if="social == 'twitter'" :href="twitterURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Tweet This">
      <i class="lab la-twitter twitter"></i>
    </a>
    <a v-if="social == 'tumblr'" :href="tumblrURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Share on Tumblr">
      <i class="lab la-tumblr tumblr"></i>
    </a>
    <a v-if="social == 'email'" :href="emailURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Send by E-Mail">
      <i class="las la-envelope"></i>
    </a>
    <a v-if="social == 'pinterest'" :href="pinterestURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Pin This">
      <i class="lab la-pinterest-p pinterest"></i>
    </a>
    <a v-if="social == 'linkedin'" :href="linkedinURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Share on LinkedIn">
      <i class="lab la-linkedin linkedin"></i>
    </a>
    <a v-if="social == 'reddit'" :href="redditURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Post on Reddit">
      <i class="lab la-reddit reddit"></i>
    </a>
    <a v-if="social == 'whatsapp'" :href="whatsappURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Share on Whatsapp">
      <i class="lab la-whatsapp whatsapp"></i>
    </a>
    <a v-if="social == 'copylink'" @click.prevent="copyLink" aria-label="" aria-hidden="true" title="Copy Link URL">
      <i class="las la-copy"></i>
    </a>
    <a v-if="social == 'copyproverb'" @click.prevent="copyProverb" aria-label="" aria-hidden="true" title="Copy Proverb Text">
      <i class="las la-clipboard"></i>
    </a>
    <a v-if="social == 'discover'" :href="discoverURL" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="More about this proverb">
      <i class="lab la-readme"></i>
    </a>
  </div>
</template>
<script>
import * as firebase from 'firebase/app'
import 'firebase/firestore'

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
        imageURL: '',
        citation: 'proverb citation',
        text: 'proverb text',
        published: true,
        edited: new firebase.firestore.Timestamp()
      }
    },
    social: {
      type: String,
      required: false
    }
  },
  computed: {
    facebookURL() {
      return `https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fproverbialsoup.com/${this.quote.id}/`
    },
    twitterURL() {
      return `https://twitter.com/intent/tweet/?text=${this.quote.text}&amp;url=https%3A%2F%2Fproverbialsoup.com/${this.quote.id}/`
    },
    tumblrURL() {
      return `https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=Beneficial%20sayings%20worth%20repeating%20and%20sharing%20in%20real%20life%20(or%20online).&amp;caption=${this.quote.text}&amp;content=https%3A%2F%2Fproverbialsoup.com&amp;canonicalUrl=https%3A%2F%2Fproverbialsoup.com/${this.quote.id}/&amp;shareSource=tumblr_share_button`
    },
    emailURL() {
      return `mailto:?subject=${this.quote.text}&amp;body=I found this great quote, take a look at the picture: https%3A%2F%2Fproverbialsoup.com/${this.quote.id}/`
    },
    pinterestURL() {
      return `https://pinterest.com/pin/create/button/?url=https%3A%2F%2Fproverbialsoup.com/${this.quote.id}/&amp;media=${this.quote.imageURL}/&amp;description=${this.quote.text}`
    },
    linkedinURL() {
      return `https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fproverbialsoup.com/${this.quote.id}/&amp;title=${this.quote.text}&amp;summary=Beneficial%20sayings%20worth%20repeating%20and%20sharing%20in%20real%20life%20(or%20on%20LinkedIn).&amp;source=https%3A%2F%2Fproverbialsoup.com/${this.quote.id}/`
    },
    redditURL() {
      return `https://reddit.com/submit/?url=https%3A%2F%2Fproverbialsoup.com/${this.quote.id}/&amp;resubmit=true&amp;title=${this.quote.text}`
    },
    whatsappURL() {
      return `whatsapp://send?text=${this.quote.text}%20https%3A%2F%2Fproverbialsoup.com/${this.quote.id}/`
    },
    discoverURL() {
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
    }
  }
}
</script>
<style>
  i {
    color: #b83280;
    font-style: normal;
    font-size: 30px;
  }
  i.facebook:hover {
    color: #3b5998;
    font-style: normal;
    font-size: 34px;
  }
  i.twitter:hover {
    color: #55acee;
    font-style: normal;
    font-size: 34px;
  }
  i.tumblr:hover {
    color: #35465C;
    font-style: normal;
    font-size: 34px;
  }
  i:hover {
    color: #6b46c1;
    font-style: normal;
    font-size: 34px;
  }
  i.pinterest:hover {
    color: #bd081c;
    font-style: normal;
    font-size: 34px;
  }
  i.linkedin:hover {
    color: #0077b5;
    font-style: normal;
    font-size: 34px;
  }
  i.reddit:hover {
    color: #FF5700;
    font-style: normal;
    font-size: 34px;
  }
  i.whatsapp:hover {
    color: #25D366;
    font-style: normal;
    font-size: 34px;
  }
</style>