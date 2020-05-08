
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Merriweather|Muli&display=swap' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/fuzzyset.js/0.0.1/fuzzyset.min.js' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // CSS file in the project
    '@/assets/css/style.css',
    '@/assets/line-awesome/css/line-awesome.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxyHeaders: false
  },
  /*
  ** Build configuration
  */
 
  /*
   ** Customize the generated output folder
   */
  generate: {
    dir: 'public',
    routes: [
      '/ArguingWithAFool',
      '/CanShouldComfortableGood',
      '/CantGetItWrong',
      '/ChopDownATree',
      '/CriticismTakeAdviceFrom',
      '/DistressedExternalPainItself',
      '/DontChooseOurFeelings',
      '/DontHeroinLoveIt',
      '/DoRightPeopleNotice',
      '/DrinkPoisonOtherDies',
      '/EasierFoolConvinceThem',
      '/FirstStepsPraiseFirst',
      '/GentleAnswerHarshWords',
      '/HealHurtBleedPeople',
      '/IntelligenceCapacityMistakeBefore',
      '/JudgeIntentionsJudgeBehaviour',
      '/LearnFromMistakesShort',
      '/LivingTellTheirStory',
      '/MeasureTwiceCutOnce',
      '/NoMistakesStillLose',
      '/PlanningWarsGeneralsTent',
      '/ProblemFixNoWorry',
      '/RaiseKidsSpoilKids',
      '/SweatPeaceBleedWar',
      '/TrueMasterEternalStudent',
      '/TwoLivesOnlyOne',
      '/ValorStabilityCourageSoul',
      '/WeGaveOurToday',
      '/WeSufferFromImagination',
      '/WorldChangeExampleOpinion',
      '/BeingGoodAtSomething',
      '/BlameMaliceExplainStupidity',
      '/BuyCheapBuyTwice',
      '/CantHelpedMustEndured',
      '/DoNothingEvilTriumphs',
      '/FoolExpressingHisOpinion',
      '/HaveEnoughToEat',
      '/InformationLearnedValuableGiven',
      '/MistakeSmartPersonMake',
      '/OutOfPositionReason',
      '/PlantTreeRightNow',
      '/RemailSilentThoughtFool',
      '/ThreeSidesEveryStory',
      '/ThroughHellKeepGoing',
      '/UsWhoNowWhen'
    ]
  },
  
  /*
  ** Customize the base url
  */
  router: {
    base: '/' //this is whatever the project is named
  },

  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
