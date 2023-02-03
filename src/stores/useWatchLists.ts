import { Services } from "@/api";
import WatchList from "@/models/WatchList";
import { reactive, toRefs, watch } from "vue";

interface State {
  lists: WatchList[];
}

const listsKey = "WatchLists";

export default function useWatchLists(services: Services) {
  const { storageService } = services;
  const state = reactive<State>({
    lists: storageService.getItem(listsKey, () => [
      {
        title: "New List",
        id: 1,
        content: [],
      },
    ]),
  });

  function findList(id: number): WatchList | undefined {
    return state.lists.find((list) => list.id === id);
  }

  function findTitle(title: string): string | undefined {
    return state.lists.find((list) => list.title === title)?.title;
  }

  function findAvailableId(): number {
    for (let index = 1; index <= state.lists.length; index++) {
      if (!findList(index)) {
        return index;
      }
    }
    return state.lists.length + 1;
  }

  function findAvailableTitle(): string {
    const title = "New List";
    if (!findTitle(title)) {
      return title;
    }

    for (let index = 1; index <= 1000; index++) {
      const newTitle = title + " " + index;
      if (!findTitle(newTitle)) {
        return newTitle;
      }
    }
    return title;
  }

  function addList(): number {
    const id = findAvailableId();
    const title = findAvailableTitle();

    state.lists.push({
      title,
      id,
      content: [],
    });

    return id;
  }

  function deleteList(id: number) {
    const itemIndex = state.lists.findIndex((list) => list.id === id);
    state.lists.splice(itemIndex, 1);
  }

  function updateList(newList: WatchList) {
    let list = findList(newList.id);

    if (list) {
      list = { ...newList };
    } else {
      throw new Error("Could not find list with id: " + newList.id);
    }
  }

  function updateTitle(id: number, newTitle: string) {
    let list = findList(id);

    if (newTitle === list?.title) {
      return;
    }

    if (newTitle === "") {
      throw new Error("List title cannot be empty");
    } else if (findTitle(newTitle)) {
      throw new Error(
        'A list with the title "' + newTitle + '" already exists'
      );
    } else if (!list) {
      throw new Error("Could not find list with id: " + id);
    }

    list.title = newTitle;
  }

  watch(state.lists, (lists) => storageService.setItem(listsKey, lists));

  return {
    ...toRefs(state),
    findList,
    addList,
    deleteList,
    updateList,
    updateTitle,
  };
}

export type WatchListsStore = ReturnType<typeof useWatchLists>;
