export interface AppState {
    source: SourceState;
    currentPageItems: Array<string>;
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
}

export interface Statistics {
    viewCount: string;
    likeCount: string;
    commentCount: string;
}
