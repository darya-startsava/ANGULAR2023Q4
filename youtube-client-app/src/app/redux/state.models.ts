export interface AppState {
    source: SourceState;
    currentPageItems: Array<string>;
}

export interface SourceState {
    [key: string]: CustomCard;
}

export interface CustomCard {
    title?: string;
    description?: string;
    image?: string;
    video?: string;
    date?: string;
    tags?: Array<string>;
}
