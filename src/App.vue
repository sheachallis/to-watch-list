<template>
  <v-app>
    <app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppBar from "./components/AppBar.vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      //
    };
  },
  components: { AppBar },
});
</script>

<style>
.v-dialog > .v-overlay__content {
  align-items: center;
}
</style>
