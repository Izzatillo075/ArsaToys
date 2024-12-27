export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon'
  ],

  colorMode: {
    classSuffix: ''
  },

  runtimeConfig: {
    jsonBinApiKey: process.env.JSONBIN_API_KEY,
    jsonBinBinId: process.env.JSONBIN_BIN_ID,
    public: {
      postDataWebhookUrl: process.env.POST_DATA_WEBHOOK_URL
    },

  },

  devtools: { enabled: true },
  compatibilityDate: '2024-12-08'
})
