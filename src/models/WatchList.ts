import WatchListItem from "./WatchListItem";

export default interface WatchList {
  title: string;
  id: number;
  content: WatchListItem[];
}
