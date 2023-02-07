<template>
  <info-card
    title="Not Found"
    text="This page does not exist. Please create or select a list"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InfoCard from "@/components/InfoCard.vue";

// Components
export default defineComponent({
  name: "NotFound",
  components: { InfoCard },
});
</script>
