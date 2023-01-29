<template>
  <v-app>
    <NotificationSnackbars />
    <app-bar />
    <nav-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, PropType, provide } from "vue";

import { Services } from "./api";
import AppBar from "./components/AppBar.vue";
import NavBar from "./components/NavBar.vue";
import NotificationSnackbars from "./components/NotificationSnackbars.vue";
import { Store, defineStore, StoreKey } from "./stores";

export default defineComponent({
  name: "App",
  components: { AppBar, NavBar, NotificationSnackbars },
  props: { services: { type: Object as PropType<Services>, required: true } },
  setup(props) {
    const store: Store = defineStore(props.services);
    provide(StoreKey, store);
    return {};
  },
});
</script>

<style>
.v-dialog > .v-overlay__content {
  align-items: center;
}
</style>
