export enum FilterType {
    SortByDate = "sortByDate",
    SortByViewCount = "sortByViewCount",
    FilterByWord = "filterByWord"
}

export interface FilterState {
    filterType: FilterType;
    isAsc: boolean;
    wordForFilterBy: string;
}
