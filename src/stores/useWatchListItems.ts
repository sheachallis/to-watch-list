import { Services } from "@/api";
import WatchListItem from "@/models/WatchListItem";
import { reactive, toRefs } from "vue";

interface State {
  watchListItems: WatchListItem[];
}

export default function useWatchListItems(services: Services) {
  const { watchListItemsService } = services;

  const state = reactive<State>({
    watchListItems: [],
  });

  async function getWatchListItems(query: string): Promise<void> {
    state.watchListItems = await watchListItemsService.get(query);
  }

  function clearWatchListItems(): void {
    state.watchListItems = [];
  }

  return {
    ...toRefs(state),
    getWatchListItems,
    clearWatchListItems,
  };
}

export type WatchListItemsStore = ReturnType<typeof useWatchListItems>;
