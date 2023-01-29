<template>
  <InfoCard :title="title" :text="text" />
</template>

<script lang="ts">
import { defineComponent, computed, unref } from "vue";
import InfoCard from "@/components/InfoCard.vue";
import { injectStore } from "@/stores";

// Components
export default defineComponent({
  name: "HomeView",
  components: {
    InfoCard,
  },
  setup() {
    const { watchListsStore } = injectStore();
    const { lists } = watchListsStore;

    const hasNoLists = computed<boolean>(() => unref(lists).length === 0);

    const title = computed<string>(() =>
      unref(hasNoLists) ? "Create a list" : "Select a list"
    );
    const text = computed<string>(() =>
      unref(hasNoLists)
        ? "Create a list to get started"
        : "Select a list from the menu to get started"
    );

    return {
      title,
      text,
    };
  },
});
</script>
