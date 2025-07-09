import { defineNuxtPlugin } from "#app";
import SafeHtml from "vue-safe-html";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(SafeHtml);
});
