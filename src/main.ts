import { createApp } from "vue";

import vuetify from "./plugins/vuetify";
import router from "./plugins/vue-router";
import { loadFonts } from "./plugins/webfontloader";

import App from "./App.vue";
import services from "./api";

loadFonts();

createApp(App, { services }).use(router).use(vuetify).mount("#app");
