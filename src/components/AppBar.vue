<template>
  <v-app-bar>
    <v-card class="mx-4 px-1 text-h6" color="primary" @click="onClick">
      <span class="anton">MyMDb</span>
    </v-card>
    <v-spacer />
    <settings-menu />
  </v-app-bar>
</template>

<script lang="ts">
import { injectStore } from "@/stores";
import { defineComponent } from "vue";
import SettingsMenu from "./SettingsMenu.vue";

// Components

export default defineComponent({
  name: "AppBar",
  components: {
    SettingsMenu,
  },
  setup() {
    const { routerStore } = injectStore();

    function onClick() {
      routerStore.push("/");
    }

    return {
      onClick,
    };
  },
});
</script>
