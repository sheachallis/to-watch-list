<template>
  <v-container>
    <watch-list />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import WatchList from "@/components/WatchList.vue";

// Components
export default defineComponent({
  name: "WatchListView",
  components: { WatchList },
});
</script>
