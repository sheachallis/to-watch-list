<template>
  <v-list-item @click="onOpen"> <v-icon icon="mdi-plus" /> </v-list-item>

  <v-dialog v-model="dialog">
    <v-card width="60vw">
      <v-card-title class="bg-grey-lighten-2"> Add an Item </v-card-title>
      <v-card-text>
        <v-text-field v-model="input" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn prepend-icon="mdi-cancel" @click="onClose">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, toRefs } from "vue";

interface State {
  dialog: boolean;
  input: string;
}

export default defineComponent({
  name: "AddWatchItem",
  setup() {
    const state = reactive<State>({
      dialog: false,
      input: "",
    });

    function onOpen() {
      state.dialog = true;
    }

    function onClose() {
      state.dialog = false;
    }

    return { ...toRefs(state), onOpen, onClose };
  },
});
</script>
