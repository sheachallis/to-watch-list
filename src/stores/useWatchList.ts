import WatchList from "@/models/WatchList";
import WatchListItem from "@/models/WatchListItem";
import { reactive, toRefs } from "vue";
import { Store } from ".";

export default function useWatchList(store: Store) {
  const { watchListsStore, notificationsStore } = store;
  const { notifyError } = notificationsStore;
  const { findList, updateList } = watchListsStore;

  const state = reactive<WatchList>({
    title: "New List",
    id: 1,
    content: [],
  });

  function setTitle(newTitle: string) {
    state.title = newTitle;
  }

  function addItem(item: WatchListItem) {
    if (state.content.find((i) => i.imdbId === item.imdbId)) {
      const error = new Error(
        "This item already exists in the current watch list!"
      );
      notifyError(error.message);
      throw error;
    }
    state.content.push(item);
    updateList(state);
  }

  function deleteItem(imdbId: string) {
    const itemIndex = state.content.findIndex((i) => i.imdbId === imdbId);
    state.content.splice(itemIndex, 1);
    updateList(state);
  }

  function moveItem(oldIndex: number, newIndex: number) {
    if (newIndex < 0 || newIndex > state.content.length - 1) {
      throw Error(
        "New index '" +
          newIndex +
          "' for list item with id: '" +
          oldIndex +
          "' was out of bounds."
      );
    }

    state.content.splice(newIndex, 0, state.content.splice(oldIndex, 1)[0]);
    updateList(state);
  }

  function loadList(id: number) {
    const newList = findList(id);
    if (newList) {
      state.title = newList.title;
      state.content = newList.content;
      state.id = newList.id;
    } else {
      throw new Error("List with ID " + id + " could not be found...");
    }
  }

  return {
    ...toRefs(state),
    setTitle,
    addItem,
    deleteItem,
    moveItem,
    loadList,
  };
}

export type WatchListStore = ReturnType<typeof useWatchList>;
