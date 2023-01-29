import axios from "axios";
import { createApp, getTransitionRawChildren } from "vue";

const baseURL = "http://www.omdbapi.com/";

const axiosInstance = axios.create({
  baseURL,
  params: {
    apikey: "35cfd399",
  },
});

axios.interceptors.response.use((response) => {
  const { data } = response;
  return data;
});

export type EndpointParameters = Record<string, string | number>;
export type EndpointFormatter = (
  endpointParameters: EndpointParameters
) => string;

export default abstract class Service {
  protected static readonly http = axiosInstance;

  protected abstract readonly endpointFormatter: EndpointFormatter;
  private endpointParameters: EndpointParameters;

  protected constructor() {
    this.endpointParameters = {};
  }

  public using(parameters: EndpointParameters): this {
    this.endpointParameters = parameters;
    return this;
  }

  protected get endpoint(): string {
    return this.endpointFormatter(this.endpointParameters);
  }
}
