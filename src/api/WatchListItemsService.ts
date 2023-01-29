import WatchListItem from "@/models/WatchListItem";
import Service from "./service";

interface OmdbItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export class WatchListItemsService extends Service {
  public static readonly instance = new WatchListItemsService();

  protected readonly endpointFormatter = (): string => "";

  public async get(query: string): Promise<WatchListItem[]> {
    const { data } = await Service.http.get(this.endpoint, {
      params: { s: query },
    });

    const formattedData: WatchListItem[] = (
      (data?.Search as OmdbItem[]) || []
    ).map((item) => {
      return {
        title: item.Title,
        year: item.Year,
        imdbId: item.imdbID,
        type: item.Type,
        poster: item.Poster,
      };
    });
    return formattedData;
  }
}

export default WatchListItemsService.instance;
