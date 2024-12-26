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
    public: {
      postDataWebhookUrl: process.env.POST_DATA_WEBHOOK_URL
    }
  },

  devtools: { enabled: true },
  compatibilityDate: '2024-12-08'
})