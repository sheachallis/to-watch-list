<template>
  <v-app-bar title="Work In Progress">
    <v-spacer />
    <settings-menu />
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SettingsMenu from "./SettingsMenu.vue";

// Components

export default defineComponent({
  name: "AppBar",
  components: {
    SettingsMenu,
  },
});
</script>
