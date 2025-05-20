// plugins/vue3-print-nb.client.ts
import { defineNuxtPlugin } from "#app";
import Vue3PrintNb from "vue3-print-nb";

export default defineNuxtPlugin((nuxtApp) => {
  // Register vue3-print-nb with the Vue app instance
  nuxtApp.vueApp.use(Vue3PrintNb);
});
