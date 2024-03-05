export interface AppState {
    source: SourceState;
    currentPageItems: CurrentPageState;
    currentVideo: VideoItem;
    pagination: PaginationState;
    favorite: Array<string>;
}

export interface SourceState {
    [key: string]: VideoItem;
}

export interface VideoItem {
    isCustomCard: boolean;
    id: string;
    title?: string;
    description?: string;
    image?: string;
    publishedAt?: string;
    statistics?: Statistics | null;
    dateStatus?: string;
}

export interface Statistics {
    viewCount: string;
    likeCount: string;
    commentCount: string;
}

export interface PaginationState {
    input: string;
    currentPage: number;
    nextPageToken: string;
    prevPageToken: string;
}

export interface CurrentPageState {
    customCardIds: Array<string>;
    currentPageItemsIds: Array<string>;
    currentPageYoutubeItemsSortInfo: Array<CurrentPageItemsSortInfo>;
    isAsc: boolean;
    filterType: FilterType;
}

export interface CurrentPageItemsSortInfo {
    id: string;
    publishedAt: string;
    viewCount: string;
}

export enum FilterType {
    SortByDate = "sortByDate",
    SortByViewCount = "sortByViewCount",
    WithoutSort = "withoutSort"
}
