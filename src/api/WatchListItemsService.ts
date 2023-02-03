import WatchListItem from "@/models/WatchListItem";
import Service from "./service";

interface OmdbItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface ListData {
  items: WatchListItem[];
  totalPages: number;
}

export class WatchListItemsService extends Service {
  public static readonly instance = new WatchListItemsService();

  protected readonly endpointFormatter = (): string => "";

  public async get(query: string, page: number = 1): Promise<ListData> {
    const { data } = await Service.http.get(this.endpoint, {
      params: { s: query, page },
    });

    const items: WatchListItem[] = ((data?.Search as OmdbItem[]) || []).map(
      (item) => {
        return {
          title: item.Title,
          year: item.Year,
          imdbId: item.imdbID,
          type: item.Type,
          poster: item.Poster,
        };
      }
    );

    const totalPages = data ? Math.ceil(data.totalResults / 10) : 1;

    return {
      items,
      totalPages,
    };
  }
}

export default WatchListItemsService.instance;
