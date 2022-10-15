<template>
  <v-card title="My Lists">
    <v-list>
      <v-list-item
        v-for="item in listItems"
        :title="item.title"
        :to="`/list/${item.index}`"
      >
        <template #prepend>
          <v-avatar color="primary">
            {{ item.index }}
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListsCard",
  setup() {
    const listItems = [
      { title: "item 1", index: 1 },
      { title: "item 2", index: 2 },
    ];

    return {
      listItems,
    };
  },
});
</script>
