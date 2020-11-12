<template>
  <nav id="navbar" class="flex items-center justify-between flex-wrap md:rounded-lg shadow-lg">
    <div id="sitename" @click="$router.push(`/`)" class="cursor-pointer flex items-center flex-none mr-2 font-display text-l">
      <Logo class="fill-current h-8 w-8 mx-1" />
      Proverbial Soup
    </div>
      <div class="">
        <a href="https://twitter.com/provsoup" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Provsoup on Twitter" class="m-auto mr-2 inline-block">
          <i class="lab la-twitter twitter"></i>
        </a>
        <a href="https://www.instagram.com/provsoup/" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Provsoup on Instagram" class="m-auto mr-2 inline-block">
          <i class="lab la-instagram instagram"></i>
        </a>
        <a href="https://www.facebook.com/provsoup/" target="_blank" rel="noopener" aria-label="" aria-hidden="true" title="Provsoup on Facebook" class="m-auto mr-2 inline-block">
          <i class="lab la-facebook facebook"></i>
        </a>
        <!-- <div class="md:hidden inline-block">
        <i @click="$router.push(`/${randomQuoteLabel}`)" class="las la-random cursor-pointer text-center m-auto mr-2 inline-block" title="Random Proverb" />
        </div> -->
        <div class="md:hidden inline-block">
        <i @click="showSearch = !showSearch" class="las la-search cursor-pointer text-center m-auto mr-2 inline-block" title="Search for a Proverb"></i>
        </div>
      </div>
      <div class="hidden md:flex">
        <i @click="$router.push(`/${randomQuoteLabel}`)" class="las la-random cursor-pointer text-center m-auto mr-2 inline-block" title="Random Proverb" />
        <Search autofocus :quote="quote" class="inline-block px-4 py-2 border rounded mt-4 md:mt-0" />
      </div>
      <div v-if="showSearch" class="md:hidden">
        <Search autofocus :quote="quote" class="inline-block px-4 py-2 border rounded mt-4 md:mt-0" />
      </div>
  </nav>
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
      showSearch: false
    }
  },
  computed: {
    randomQuoteLabel() {
      let randomID
      do {
        randomID = this.$store.getters.randomQuoteID(Math.floor(Math.random() * this.$store.getters.quotesCount))
      } while (randomID == this.quote.id)
      return randomID
    }
  }
}

</script>
<style scoped>
#navbar {
  background-color: #00637E
}

#sitename {
  color: #EB8970
}
#sitename:hover {
  color: #F7BF92
}

i {
  color: #EB8970;
  font-style: normal;
  font-size: 30px;
}

i:hover {
  color: #F7BF92;
  font-style: normal;
  font-size: 30px;
}

i.twitter:hover {
  color: #55acee;
  font-style: normal;
  font-size: 30px;
}

i.instagram:hover {
  color: #e1306c;
  font-style: normal;
  font-size: 30px;
}

i.facebook:hover {
  color: #4e71ba;
  font-style: normal;
  font-size: 30px;
}

</style>
