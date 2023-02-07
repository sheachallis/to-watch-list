<template>
  <v-menu location="bottom end" :close-on-content-click="false">
    <template #activator="{ props }">
      <v-btn v-bind="{ ...props }" icon="mdi-cog-outline"
    /></template>

    <v-card title="Settings">
      <v-card-subtitle>Theme</v-card-subtitle>
      <v-card-text>
        <v-btn-toggle v-model="theme" color="primary" mandatory>
          <v-btn value="light" append-icon="mdi-white-balance-sunny"
            >Light</v-btn
          >
          <v-btn value="dark" append-icon="mdi-weather-night">Dark</v-btn>
        </v-btn-toggle>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { injectStore } from "@/stores";
import { defineComponent } from "vue";

// Components

export default defineComponent({
  name: "SettingsMenu",
  setup() {
    const { themeStore } = injectStore();
    const { theme } = themeStore;

    return {
      theme,
    };
  },
});
</script>
