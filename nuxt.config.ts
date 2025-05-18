// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "unplugin-icons/nuxt",
    "@nuxtjs/device",
    "@vee-validate/nuxt",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "unplugin-icons/nuxt",
    "@nuxtjs/device",
    "@pinia/nuxt",
  ],
  // dateFns configuration should be placed in the module options if supported, not in the root config
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  googleFonts: {
    families: {
      "IBM Plex Sans Thai": {
        wght: [100, 200, 300, 400, 500, 600, 700],
      },
      Poppins: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        ital: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
      Sarabun: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800],
        ital: [100, 200, 300, 400, 500, 600, 700, 800],
      },
      "Noto Sans Thai": {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    },
    display: "swap",
  },
  css: ["@/assets/css/fonts.css", "@/assets/css/main.css"],
  runtimeConfig: {
    public: {
      $http: process.env.PUBLIC_HTTP || "http://localhost:8080/v1", // API base URL
    },
  },
});
