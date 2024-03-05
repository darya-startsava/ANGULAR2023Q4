import { Item, ItemSearch } from "./search-item.model";

export interface ResponseSearch {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: Array<ItemSearch>;
    nextPageToken?: string;
    prevPageToken?: string;
}

export interface ResponseSnippet {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: Array<Item>;
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
}
