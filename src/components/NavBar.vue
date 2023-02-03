<template>
  <v-navigation-drawer permanent>
    <v-list v-model:selected="selected" nav>
      <v-list-item class="text-body-1 font-weight-medium" value="title">
        Your Lists
        <template #append>
          <v-btn
            icon="mdi-plus"
            class="my-n1"
            variant="text"
            @click="onAdd"
          ></v-btn>
        </template>
      </v-list-item>
      <v-hover v-for="list in lists" :key="list.id">
        <template #default="{ isHovering, props }">
          <v-list-item
            v-bind:="props"
            class="pl-4 text-body-1"
            :disabled="list.id == isEditing"
            :value="list.id.toString()"
            @click="isEditing === list.id ? undefined : navigateToList(list.id)"
          >
            <v-text-field
              v-model="newTitle"
              v-if="isEditing === list.id"
              autofocus
              class="mb-n4 mt-n2"
              density="compact"
              variant="plain"
              @blur="onSetTitle"
              @keyup.native.enter="onSetTitle"
              @focus="$event.target.select()"
            />
            <span v-else>{{ list.title }}</span>
            <template #append>
              <v-btn
                v-if="isHovering"
                class="ma-n2"
                icon="mdi-pencil"
                variant="plain"
                @click="onEdit(list)"
              />
              <delete-list
                :is-present="(isHovering!! ? isHovering : false)"
                :list-id="list.id"
                :list-title="list.title"
              />
            </template>
          </v-list-item>
        </template>
      </v-hover>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import WatchList from "@/models/WatchList";
import { injectStore } from "@/stores";
import DeleteList from "@/views/modals/DeleteList.vue";
import { computed } from "@vue/reactivity";
import { defineComponent, reactive, toRefs, unref } from "vue";

interface State {
  isEditing: number | null;
  newTitle: string;
}

export default defineComponent({
  name: "NavBar",
  components: { DeleteList },
  setup() {
    const { notificationsStore, routerStore, watchListStore, watchListsStore } =
      injectStore();
    const { notifyError } = notificationsStore;
    const { addList, updateTitle, lists } = watchListsStore;
    const { currentRoute, push } = routerStore;
    const { loadList } = watchListStore;

    const state = reactive<State>({
      isEditing: null,
      newTitle: "",
    });

    const selected = computed<string[]>(() => [
      unref(currentRoute).params.id?.toString(),
    ]);

    function navigateToList(id: number) {
      push(`/list/${id}`);
    }

    function onAdd() {
      const newListId = addList();
      navigateToList(newListId);
    }

    function onEdit(list: WatchList) {
      navigateToList(list.id);
      state.newTitle = list.title;
      state.isEditing = list.id;
    }

    function onSetTitle() {
      let { isEditing, newTitle } = state;

      newTitle = newTitle.trim();

      if (isEditing !== null) {
        try {
          updateTitle(isEditing, newTitle);
          loadList(isEditing);
          navigateToList(isEditing);
        } catch (e) {
          const error = e as Error;
          notifyError((e as Error).message, error);
        }
      }
      state.isEditing = null;
      state.newTitle = "";
    }

    return {
      ...toRefs(state),
      selected,
      lists,
      onAdd,
      onEdit,
      onSetTitle,
      navigateToList,
    };
  },
});
</script>
