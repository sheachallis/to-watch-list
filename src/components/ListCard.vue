<template>
  <v-card>
    <v-card-title class="bg-grey-lighten-2">
      <v-row no-gutters class="align-center">
        {{ title }}

        <v-spacer />
        <v-btn
          icon="mdi-share-variant"
          class="ma-n1"
          variant="text"
          @click="onShare"
        />
      </v-row>
    </v-card-title>
    <v-list>
      <div ref="list">
        <v-hover v-for="(item, index) in content" :key="item.imdbId">
          <template #default="{ isHovering, props }">
            <v-list-item
              :class="getListItemClass(index)"
              v-bind="props"
              :title="item.title"
              :subtitle="item.year"
              :active="index === draggedIndex"
              @mousedown.prevent="onDragStart($event, index)"
            >
              <template #prepend>
                <v-avatar rounded="0">
                  <v-img :src="item.poster" :alt="(index + 1).toString()" />
                </v-avatar>
              </template>
              <template #append>
                <v-btn
                  v-if="isHovering"
                  class="ma-n2"
                  icon="mdi-trash-can-outline"
                  variant="plain"
                  @click="deleteItem(item.imdbId)"
                />
              </template>
            </v-list-item>
          </template>
        </v-hover>
        <div ref="listItem">
          <add-watch-list-item />
        </div>
      </div>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, unref } from "vue";
import AddWatchListItem from "@/views/modals/AddWatchListItem.vue";
import { injectStore } from "@/stores";
import { shareStatus } from "@/share";

interface State {
  draggedIndex?: number;
  list?: HTMLDivElement;
  listItem?: HTMLDivElement;
  targetIndex?: number;
}

export default defineComponent({
  name: "ListsCard",
  setup() {
    const { notificationsStore, watchListStore } = injectStore();
    const { notifyInfo, notifyError } = notificationsStore;
    const { title, content, deleteItem, moveItem } = watchListStore;

    const state = reactive<State>({
      draggedIndex: undefined,
      list: undefined,
      listItem: undefined,
      targetIndex: undefined,
    });

    function onShare() {
      try {
        shareStatus(unref(title), unref(content), () =>
          notifyInfo("List '" + unref(title) + "' copied to clipboard", 2500)
        );
      } catch (e) {
        const error = e as Error;
        notifyError(
          "Failed to share list, cause: " + (error as Error).message,
          error
        );
      }
    }

    const finalIndex = computed<number>(() => unref(content).length - 1);

    function onDragStart(event: MouseEvent, index: number) {
      window.addEventListener("mouseup", onDragFinish);
      window.addEventListener("mousemove", onDragUpdate);
      window.addEventListener("mouseleave", onDragFinish);

      state.draggedIndex = index;
    }

    function onDragUpdate(event: MouseEvent) {
      const newIndex = getTargetIndex(event);
      state.targetIndex = newIndex;
    }

    function onDragFinish(event: MouseEvent) {
      window.removeEventListener("mouseup", onDragFinish);
      window.removeEventListener("mousemove", onDragUpdate);
      window.removeEventListener("mouseleave", onDragFinish);

      const oldIndex = unref(state.draggedIndex);
      const newIndex = getNewIndex(event);

      if (oldIndex != undefined && newIndex != undefined) {
        moveItem(oldIndex, newIndex);
      }
      state.draggedIndex = undefined;
      state.targetIndex = undefined;
    }

    function getNewIndex(event: MouseEvent): number | undefined {
      const oldIndex = unref(state.draggedIndex);
      let newIndex = getTargetIndex(event);

      if (newIndex != undefined && oldIndex != undefined) {
        if (newIndex > oldIndex) {
          newIndex--;
        }

        return newIndex;
      }
      return;
    }

    function getTargetIndex(event: MouseEvent): number | undefined {
      const listTop = unref(state.list)?.getBoundingClientRect().top;
      const listItemHeight = unref(state.listItem)?.getBoundingClientRect()
        .height;
      const currentY = event.clientY;

      if (isInList(event) && listTop && listItemHeight) {
        const listPosition = (currentY - listTop) / listItemHeight;
        let targetIndex = Math.floor(listPosition + 0.5);

        return targetIndex >= unref(content).length
          ? unref(content).length
          : targetIndex;
      }
      return;
    }

    function isInList(event: MouseEvent): boolean {
      const { clientY, clientX } = event;
      const listBoundry = unref(state.list)?.getBoundingClientRect();

      if (
        listBoundry &&
        clientY > listBoundry.top &&
        clientY < listBoundry.bottom &&
        clientX > listBoundry.left &&
        clientX < listBoundry.right
      ) {
        return true;
      }
      return false;
    }

    function getListItemClass(index: number): string {
      const { targetIndex, draggedIndex } = state;

      if (
        draggedIndex != undefined &&
        index === targetIndex &&
        index !== draggedIndex &&
        index !== draggedIndex + 1
      ) {
        return "overlined";
      } else if (
        targetIndex === unref(finalIndex) + 1 &&
        index === targetIndex - 1 &&
        index !== draggedIndex
      ) {
        return "underlined";
      }
      return "";
    }

    return {
      ...toRefs(state),
      onShare,
      title,
      content,
      deleteItem,
      onDragStart,
      getListItemClass,
    };
  },
  components: { AddWatchListItem },
});
</script>

<style>
.overlined {
  border-top-width: 1px;
  border-color: var(--v-theme-primary);
}
.underlined {
  border-bottom-width: 1px;
  border-color: var(--v-theme-primary);
}
</style>
