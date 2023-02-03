<template>
  <v-container class="d-flex fill-height justify-center align-center">
    <v-card density="comfortable" variant="tonal" width="35vw">
      <v-card-title class="text-h5 pa-6">
        {{ title }}
      </v-card-title>
      <v-card-text class="pl-6 pb-6">
        {{ text }}
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Components

export default defineComponent({
  name: "InfoCard",
  props: {
    title: { type: String, required: true },
    text: { type: String, required: true },
  },
});
</script>
