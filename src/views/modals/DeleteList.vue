<template>
  <v-dialog v-model="dialog" width="60vw">
    <template #activator>
      <v-btn
        v-if="isPresent"
        class="ma-n2"
        icon="mdi-trash-can-outline"
        variant="plain"
        @click="onOpen"
      />
    </template>

    <v-card width="30vw">
      <v-card-title class="bg-titleBar">
        <v-row no-gutters class="align-center"> Delete List </v-row>
      </v-card-title>
      <v-card-text>
        Are you sure you want to delete list "{{ listTitle }}"
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="tonal" @click="onClose">Cancel</v-btn>
        <v-btn color="error" variant="elevated" @click="onConfirm"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import router from "@/plugins/vue-router";
import { injectStore } from "@/stores";
import { defineComponent, reactive, toRefs, unref } from "vue";

interface State {
  dialog: boolean;
}

export default defineComponent({
  name: "DeleteList",
  props: {
    isPresent: { type: Boolean, required: false, default: true },
    listTitle: { type: String, required: true },
    listId: { type: Number, required: true },
  },
  setup(props) {
    const { routerStore, watchListsStore } = injectStore();
    const { deleteList } = watchListsStore;
    const { currentRoute, push } = routerStore;
    const state = reactive<State>({
      dialog: false,
    });

    function onOpen() {
      state.dialog = true;
    }

    function onClose() {
      state.dialog = false;
    }

    async function onConfirm() {
      const currentId = unref(currentRoute).params.id;
      if (Number(currentId) === unref(props.listId)) {
        console.log("pushing");

        await push("/");
      }
      deleteList(props.listId);
    }

    return {
      ...toRefs(state),
      onOpen,
      onClose,
      onConfirm,
    };
  },
});
</script>
