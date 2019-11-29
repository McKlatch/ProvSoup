<template>
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="max-w-sm rounded overflow-hidden">
      <img class="w-full rounded-tl rounded-tr rounded-bl shadow" :src="displayImgURL" :alt="`&quot;${proverb}&quot; - ${origin}`">
      <nuxt-link to="/">
      <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 float-right rounded-b shadow">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
          <path d="M21.67 3.955l-2.825-2.202.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.942-2.292h-4.162c-3.547.043-5.202 3.405-6.913 7.023 1.711 3.617 3.366 6.979 6.913 7.022h4.099l-2.883-2.247.665-.753 4.478 3.497-4.474 3.503-.665-.753 2.884-2.247h-4.11c-3.896-.048-5.784-3.369-7.461-6.858-1.687 3.51-3.592 6.842-7.539 6.858h-2.623v-1h2.621c3.6-.014 5.268-3.387 6.988-7.022-1.72-3.636-3.388-7.009-6.988-7.023h-2.621v-1h2.623c3.947.016 5.852 3.348 7.539 6.858 1.677-3.489 3.565-6.81 7.461-6.858h4.047z" /></svg>
      </button>
    </nuxt-link>
    </div>
  </div>
</template>

<script>
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
      required: true,
      default: 'https://proverbialsoup.com/'
    }
  },
  computed: {
    displayImgURL() {
      if (this.label === "NotLoaded") {
        return require(`~/assets/img/quotes/${this.label}.gif`)
      }
      return require(`~/assets/img/quotes/${this.label}.png`)
    }
  }
}
</script>