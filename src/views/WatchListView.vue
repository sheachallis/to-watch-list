<template>
  <v-container>
    <list-card />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListCard from "@/components/ListCard.vue";

// Components
export default defineComponent({
  name: "WatchListView",
  components: { ListCard },
});
</script>
