// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.scss', 'vue-final-modal/style.css', 'animate.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/css/mixins.scss" as *;',
        },
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@formkit/auto-animate/nuxt',
    'nuxt-swiper',
    '@vee-validate/nuxt',
    '@nuxt/image',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },
  // routeRules: {
  //   '/api/**': {
  //     proxy: {
  //       to: 'http://localhost:5000',
  //     },
  //   },
  // },
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'register',
        path: '/register',
        file: '~/pages/login.vue',
      });
    },
  },
  runtimeConfig: {
    // Private keys are only available on the server
    PRIVATE_BASE_URL: process.env.NUXT_BASE_URL,

    // Public keys that are exposed to the client
    public: {
      PUBLIC_BASE_URL: process.env.NUXT_BASE_URL,
    },
  },
  typescript: {
    typeCheck: false,
  },
});
