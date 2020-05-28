<template>
  <div class="w-full max-w-sm">
  <div class="flex bg-gray-300">

<social-button :label="quote.id" :origin="quote.contributor" :proverb="quote.text" :source="quote.citation" :clickURL="`https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fproverbialsoup.com/${quote.id}/`" buttonClass="" titleText="Share on Facebook"><i class="lab la-facebook" style="color:#3b5998;font-style:normal;"></i></i></social-button>

<social-button :label="quote.id" :origin="quote.contributor" :proverb="quote.text" :source="quote.citation" :clickURL="`https://twitter.com/intent/tweet/?text=${quote.text}&amp;url=https%3A%2F%2Fproverbialsoup.com/${quote.id}/`" buttonClass="" titleText="Tweet this"><i class="lab la-twitter" style="color:#55acee;font-style:normal;"></i></social-button>

<social-button :label="quote.id" :origin="quote.contributor" :proverb="quote.text" :source="quote.citation" :clickURL="`https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=Beneficial%20sayings%20worth%20repeating%20and%20sharing%20in%20real%20life%20(or%20online).&amp;caption=${quote.text}&amp;content=https%3A%2F%2Fproverbialsoup.com&amp;canonicalUrl=https%3A%2F%2Fproverbialsoup.com/${quote.id}/&amp;shareSource=tumblr_share_button`" buttonClass="" titleText="Share on Tumblr"><i class="lab la-tumblr" style="color:#35465C;font-style:normal;"></i></social-button>

<social-button :label="quote.id" :origin="quote.contributor" :proverb="quote.text" :source="quote.citation" :clickURL="`mailto:?subject=${quote.text}&amp;body=I found this great quote, take a look at the picture: https%3A%2F%2Fproverbialsoup.com/${quote.id}/`" buttonClass="" titleText="Send by E-Mail"><i class="las la-envelope" style="color:#777;font-style:normal;"></i></social-button>

<social-button :label="quote.id" :origin="quote.contributor" :proverb="quote.text" :source="quote.citation" :clickURL="`https://pinterest.com/pin/create/button/?url=https%3A%2F%2Fproverbialsoup.com/${quote.id}/&amp;media=${this.quote.imageURL}/&amp;description=${quote.text}`" buttonClass="" titleText="Pin this"><i class="lab la-pinterest-p" style="color:#bd081c;font-style:normal;"></i></social-button>

<social-button :label="quote.id" :origin="quote.contributor" :proverb="quote.text" :source="quote.citation" :clickURL="`https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fproverbialsoup.com/${quote.id}/&amp;title=${quote.text}&amp;summary=Beneficial%20sayings%20worth%20repeating%20and%20sharing%20in%20real%20life%20(or%20on%20LinkedIn).&amp;source=https%3A%2F%2Fproverbialsoup.com/${quote.id}/`" buttonClass="" titleText="Share on LinkedIn"><i class="lab la-linkedin" style="color:#0077b5;font-style:normal;"></i></social-button>

<social-button :label="quote.id" :origin="quote.contributor" :proverb="quote.text" :source="quote.citation" :clickURL="`https://reddit.com/submit/?url=https%3A%2F%2Fproverbialsoup.com/${quote.id}/&amp;resubmit=true&amp;title=${quote.text}`" buttonClass="" titleText="Post on Reddit"><i class="lab la-reddit" style="color:#FF5700;font-style:normal;"></i></social-button>

<social-button :label="quote.id" :origin="quote.contributor" :proverb="quote.text" :source="quote.citation" :clickURL="`whatsapp://send?text=${quote.text}%20https%3A%2F%2Fproverbialsoup.com/${quote.id}/`" buttonClass="" titleText="Share on Whatsapp (phone only)"><i class="lab la-whatsapp" style="color:#25D366;font-style:normal;"></i></social-button>

<!-- copy url -->
<a @click.prevent="copyLink" class="flex-1" aria-label="">
    <button :class="socialIconButton" title="Copy Link">
      <span :class="socialIconClass + ' sm:text-lg md:text-2xl'"><i class="las la-copy" style="color:#777;font-style:normal;"></i></span>
    </button>
  </a>

    <!-- copy prov text -->
    <a @click.prevent="copyProverb" class="flex-1" aria-label="">
    <button :class="socialIconButton" title="Copy Proverb">
      <span :class="socialIconClass + ' sm:text-lg md:text-2xl'"><i class="las la-clipboard" style="color:#777;font-style:normal;"></i></span>
    </button>
  </a>

    <!-- search -->
    <a class="flex-1" :href="discoverLink" target="_blank" rel="noopener" aria-label="">
      <button :class="socialIconButton + ' rounded-br'" title="More about this proverb">
        <span :class="socialIconClass + ' sm:text-lg md:text-2xl'"><i class="lab la-readme" style="color:#777;font-style:normal;"></i></span>
      </button>
    </a>
  </div>
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
      socialIconButton: 'bg-gray-300 hover:bg-gray-400 h-full'
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
      const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
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