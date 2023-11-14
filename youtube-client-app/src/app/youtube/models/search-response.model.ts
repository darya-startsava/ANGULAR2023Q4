import { Item } from "./search-item.model";

export interface Response {
    kind: string;
    etag: string;
    pageInfo: PageInfo;
    items: Array<Item>
}

export interface PageInfo {
    totalResults: number;
    resultsPerPage: number
}
