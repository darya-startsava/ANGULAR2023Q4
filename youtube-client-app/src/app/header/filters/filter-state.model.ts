export enum SortType {
    Date = "date",
    ViewCount = "viewCount"
}

export interface FilterState {
    isSorted: boolean;
    sortType: SortType;
    isFilteredByWord: boolean;
    isAsc: boolean;
    wordForFilterBy: string;
}
