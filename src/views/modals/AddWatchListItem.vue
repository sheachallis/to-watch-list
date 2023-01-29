<template>
  <v-dialog v-model="dialog" width="60vw">
    <template #activator="{ props }">
      <v-list-item v-bind="props" @click="onOpen">
        <template #prepend>
          <v-avatar rounded="0">
            <v-icon icon="mdi-plus" />
          </v-avatar>
        </template>
      </v-list-item>
    </template>
    <v-card width="60vw">
      <v-card-title class="bg-grey-lighten-2">
        <v-row no-gutters class="align-center">
          Add an Item
          <v-spacer />
          <v-btn
            class="my-n1"
            icon="mdi-close"
            variant="text"
            @click="onClose"
          />
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="input"
          density="compact"
          variant="underlined"
          autofocus
          @keyup.native.enter="onSearch"
        >
          <template #append>
            <v-btn icon="mdi-magnify" variant="text" @click="onSearch" />
          </template>
        </v-text-field>
        <v-list>
          <v-list-item
            v-for="(item, index) in watchListItems"
            :title="item.title"
            :subtitle="item.year"
            :key="item.imdbId"
            @click="selectItem(item)"
          >
            <template #prepend>
              <v-avatar rounded="0">
                <v-img :src="item.poster" :alt="(index + 1).toString()" />
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { injectStore } from "@/stores";
import WatchListItem from "@/models/WatchListItem";
import { defineComponent, reactive, toRefs, unref } from "vue";

interface State {
  dialog: boolean;
  input: string;
}

export default defineComponent({
  name: "AddWatchListItem",
  setup() {
    const { watchListStore, watchListItemsStore } = injectStore();
    const { addItem } = watchListStore;
    const { watchListItems, getWatchListItems, clearWatchListItems } =
      watchListItemsStore;
    const state = reactive<State>({
      dialog: false,
      input: "",
    });

    function selectItem(item: WatchListItem) {
      addItem(item);
      onClose();
    }

    function onOpen() {
      state.input = "";
      clearWatchListItems();
      state.dialog = true;
    }

    function onClose() {
      state.dialog = false;
    }

    async function onSearch() {
      await getWatchListItems(unref(state.input));
      console.log(unref(watchListItems));
    }

    return {
      ...toRefs(state),
      onOpen,
      onClose,
      onSearch,
      watchListItems,
      selectItem,
    };
  },
});
</script>
