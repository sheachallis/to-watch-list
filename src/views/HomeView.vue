<template>
  <v-container>
    <ListsCard />
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ListsCard from "@/components/ListsCard.vue";

// Components
export default defineComponent({
  name: "HomeView",
  components: {
    ListsCard,
  },
});
</script>
