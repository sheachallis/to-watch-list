import { Services } from "@/api";
import WatchListItem from "@/models/WatchListItem";
import { reactive, toRefs } from "vue";

interface State {
  watchListItems: WatchListItem[];
  totalPages: number;
}

export default function useWatchListItems(services: Services) {
  const { watchListItemsService } = services;

  const state = reactive<State>({
    watchListItems: [],
    totalPages: 1,
  });

  async function getWatchListItems(query: string, page: number): Promise<void> {
    const listData = await watchListItemsService.get(query, page);
    state.totalPages = listData.totalPages;
    state.watchListItems = listData.items;
  }

  function clearWatchListItems(): void {
    state.watchListItems = [];
    state.totalPages = 1;
  }

  return {
    ...toRefs(state),
    getWatchListItems,
    clearWatchListItems,
  };
}

export type WatchListItemsStore = ReturnType<typeof useWatchListItems>;
