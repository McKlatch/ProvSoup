<template>
  <div class="w-full max-w-sm">
  <div class="flex bg-gray-300">

<social-button :label="label" :origin="origin" :proverb="proverb" :source="source" :clickURL="`https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fproverbialsoup.com/${label}/`" buttonClass="" titleText="Share on Facebook"><i class="lab la-facebook" style="color:#3b5998"></i></i></social-button>

<social-button :label="label" :origin="origin" :proverb="proverb" :source="source" :clickURL="`https://twitter.com/intent/tweet/?text=${proverb}&amp;url=https%3A%2F%2Fproverbialsoup.com/${label}/`" buttonClass="" titleText="Tweet this"><i class="lab la-twitter" style="color:#55acee"></i></social-button>

<social-button :label="label" :origin="origin" :proverb="proverb" :source="source" :clickURL="`https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=Beneficial%20sayings%20worth%20repeating%20and%20sharing%20in%20real%20life%20(or%20online).&amp;caption=${proverb}&amp;content=https%3A%2F%2Fproverbialsoup.com&amp;canonicalUrl=https%3A%2F%2Fproverbialsoup.com/${label}/&amp;shareSource=tumblr_share_button`" buttonClass="" titleText="Share on Tumblr"><i class="lab la-tumblr" style="color:#35465C"></i></social-button>

<social-button :label="label" :origin="origin" :proverb="proverb" :source="source" :clickURL="`mailto:?subject=${proverb}&amp;body=I found this great quote, take a look at the picture: https%3A%2F%2Fproverbialsoup.com/${label}/`" buttonClass="" titleText="Send by E-Mail"><i class="las la-envelope" style="color:#777"></i></social-button>

<social-button :label="label" :origin="origin" :proverb="proverb" :source="source" :clickURL="`https://pinterest.com/pin/create/button/?url=https%3A%2F%2Fproverbialsoup.com/${label}/&amp;media=https%3A%2F%2Fproverbialsoup.com${require(`~/assets/img/quotes/${this.label}.png`)}/&amp;description=${proverb}`" buttonClass="" titleText="Pin this"><i class="lab la-pinterest-p" style="color:#bd081c"></i></social-button>

<social-button :label="label" :origin="origin" :proverb="proverb" :source="source" :clickURL="`https://www.linkedin.com/shareArticle?mini=true&amp;url=https%3A%2F%2Fproverbialsoup.com/${label}/&amp;title=${proverb}&amp;summary=Beneficial%20sayings%20worth%20repeating%20and%20sharing%20in%20real%20life%20(or%20on%20LinkedIn).&amp;source=https%3A%2F%2Fproverbialsoup.com/${label}/`" buttonClass="" titleText="Share on LinkedIn"><i class="lab la-linkedin" style="color:#0077b5"></i></social-button>

<social-button :label="label" :origin="origin" :proverb="proverb" :source="source" :clickURL="`https://reddit.com/submit/?url=https%3A%2F%2Fproverbialsoup.com/${label}/&amp;resubmit=true&amp;title=${proverb}`" buttonClass="" titleText="Post on Reddit"><i class="lab la-reddit" style="color:#FF5700"></i></social-button>

<social-button :label="label" :origin="origin" :proverb="proverb" :source="source" :clickURL="`whatsapp://send?text=${proverb}%20https%3A%2F%2Fproverbialsoup.com/${label}/`" buttonClass="" titleText="Share on Whatsapp (phone only)"><i class="lab la-whatsapp" style="color:#25D366"></i></social-button>

<!-- copy url -->
<a @click.prevent="copyLink" class="flex-1" aria-label="">
    <button :class="socialIconButton" title="Copy Link">
      <span :class="socialIconClass + ' sm:text-lg md:text-2xl'"><i class="las la-copy" style="color:#777"></i></span>
    </button>
  </a>

    <!-- copy prov text -->
    <a @click.prevent="copyProverb" class="flex-1" aria-label="">
    <button :class="socialIconButton" title="Copy Proverb">
      <span :class="socialIconClass + ' sm:text-lg md:text-2xl'"><i class="las la-clipboard" style="color:#777"></i></span>
    </button>
  </a>

    <!-- search -->
    <a class="flex-1" :href="discoverLink" target="_blank" rel="noopener" aria-label="">
      <button :class="socialIconButton + ' rounded-br'" title="More about this proverb">
        <span :class="socialIconClass + ' sm:text-lg md:text-2xl'"><i class="lab la-readme" style="color:#777"></i></span>
      </button>
    </a>
  </div>
</div>
</template>

<script>
import SocialButton from '~/components/card/Button'

  export default {
  props: {
    label: {
      type: String,
      required: true,
      default: 'NotLoaded'
    },
    origin: {
      type: String,
      required: true,
      default: 'ProvSoup '
    },
    proverb:{
      type: String,
      required: true,
      default: 'Loading...'
    },
    source:{
      type: String,
      required: false,
      default: 'https://proverbialsoup.com/'
    }
  },
  data() {
    return {
      socialIconClass: 'm-2 mt-2',
      socialIconButton: 'bg-gray-300 hover:bg-gray-400 h-full'
    }
  },
  computed: {
    randomQuoteLabel() {
      const rdyQuotes = this.$store.getters.readyQuotes
      const filteredQuotes = rdyQuotes.filter(index => {
        return index.label !== this.label
      })
      const rand = Math.floor(Math.random() * filteredQuotes.length)
      return filteredQuotes[rand].label
    },
    discoverLink() {
      if (this.validURL(this.source)) return this.source
      // if (this.validBibleRef(this.origin)) return `http://www.biblegateway.com/passage/?search=${this.origin}&version=WEB`
      let queryText = ''
      if (!this.origin.toLowerCase().includes("unknown")) queryText += `${this.origin} `
      if (this.source && this.source !== this.origin) {
        if (!this.source.toLowerCase().includes("unknown")) queryText += `${this.source} `
      }
      queryText += this.proverb
      return `https://ecosia.org/search?q=${queryText}`
    }
  },
  methods: {
    copyLink() {
      navigator.clipboard.writeText(`https://proverbialsoup.com/${this.label}`)
    },
    copyProverb() {
      navigator.clipboard.writeText(`"${this.proverb}" - ${this.origin}`)
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