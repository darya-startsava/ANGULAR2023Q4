export interface AppState {
    source: SourceState;
    currentPageItems: CurrentPageState;
    currentVideo: VideoItem;
    pagination: PaginationState;
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
}
