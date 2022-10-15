<template>
  <v-card>
    <v-card-title class="bg-grey-lighten-2">
      <v-row no-gutters class="align-center">
        {{ title }}
        <v-spacer />
        <v-btn icon="mdi-pencil" variant="text" />
      </v-row>
    </v-card-title>
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
      <add-watch-item />
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import AddWatchItem from "@/views/modals/AddWatchItem.vue";

interface State {
  title: string;
}

export default defineComponent({
  name: "ListsCard",
  setup() {
    const state = reactive<State>({
      title: "My List",
    });
    const listItems = [
      { title: "item 1", index: 1 },
      { title: "item 2", index: 2 },
    ];
    return {
      ...toRefs(state),
      listItems,
    };
  },
  components: { AddWatchItem },
});
</script>
