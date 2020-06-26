/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  theme: {
    fontFamily: {
      'display': ['Merriweather', 'Georgia', 'Cambria'],
      'body': ['Muli', '-apple-system', 'BlinkMacSystemFont']
    }
  },
  variants: {
    borderColor: ['responsive', 'hover', 'focus', 'focus-within']
  },
  plugins: []
}
