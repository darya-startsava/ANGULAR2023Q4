import { createReducer, on } from "@ngrx/store";

import { createCard, deleteCustomCard } from "../actions/card.actions";
import {
    goToNextPageSuccess,
    goToPreviousPageSuccess
} from "../actions/pagination.actions";
import { searchSuccess } from "../actions/search.actions";
import { sortByDate, sortByViewCount } from "../actions/sort.actions";
import { CurrentPageState, FilterType } from "../state.models";

const initialState: CurrentPageState = {
    customCardIds: [],
    currentPageItemsIds: [],
    currentPageYoutubeItemsSortInfo: [],
    isAsc: true,
    filterType: FilterType.WithoutSort
};

export const currentPageReducer = createReducer<CurrentPageState>(
    initialState,
    on(
        createCard,
        (state, { id }): CurrentPageState => ({
            ...state,
            customCardIds: [...state.customCardIds, id]
        })
    ),

    on(
        searchSuccess,
        (state, { data }): CurrentPageState => ({
            ...state,
            currentPageItemsIds: [
                ...state.customCardIds,
                ...data.items.map((item) => item.id)
            ],
            currentPageYoutubeItemsSortInfo: data.items.map((item) => ({
                id: item.id,
                publishedAt: item.snippet.publishedAt,
                viewCount: item.statistics.viewCount
            }))
        })
    ),

    on(
        deleteCustomCard,
        (state, { id }): CurrentPageState => ({
            ...state,
            currentPageItemsIds: [
                ...state.currentPageItemsIds.filter((item) => item !== id)
            ],
            customCardIds: [
                ...state.customCardIds.filter((item) => item !== id)
            ]
        })
    ),

    on(
        goToNextPageSuccess,
        (state, { data }): CurrentPageState => ({
            ...state,
            currentPageItemsIds: [...data.items.map((item) => item.id)],
            currentPageYoutubeItemsSortInfo: data.items.map((item) => ({
                id: item.id,
                publishedAt: item.snippet.publishedAt,
                viewCount: item.statistics.viewCount
            }))
        })
    ),

    on(
        goToPreviousPageSuccess,
        (state, { data, prevPageToken }): CurrentPageState => {
            if (prevPageToken) {
                return {
                    ...state,
                    currentPageItemsIds: [...data.items.map((item) => item.id)],
                    currentPageYoutubeItemsSortInfo: data.items.map((item) => ({
                        id: item.id,
                        publishedAt: item.snippet.publishedAt,
                        viewCount: item.statistics.viewCount
                    }))
                };
            }
            return {
                ...state,
                currentPageItemsIds: [
                    ...state.customCardIds,
                    ...data.items.map((item) => item.id)
                ],
                currentPageYoutubeItemsSortInfo: data.items.map((item) => ({
                    id: item.id,
                    publishedAt: item.snippet.publishedAt,
                    viewCount: item.statistics.viewCount
                }))
            };
        }
    ),

    on(sortByDate, (state): CurrentPageState => {
        const isAsc =
            state.filterType === FilterType.SortByDate ? !state.isAsc : true;
        const sortedItems = [...state.currentPageYoutubeItemsSortInfo]
            .sort((a, b) => {
                if (isAsc) {
                    return +new Date(a.publishedAt) - +new Date(b.publishedAt);
                }
                return +new Date(b.publishedAt) - +new Date(a.publishedAt);
            })
            .map((item) => item.id);
        if (
            state.currentPageItemsIds.find((item) =>
                item.includes("customCard")
            )
        ) {
            return {
                ...state,
                currentPageItemsIds: [...state.customCardIds, ...sortedItems],
                isAsc,
                filterType: FilterType.SortByDate
            };
        }
        return {
            ...state,
            currentPageItemsIds: [...sortedItems],
            isAsc,
            filterType: FilterType.SortByDate
        };
    }),

    on(sortByViewCount, (state): CurrentPageState => {
        const isAsc =
            state.filterType === FilterType.SortByViewCount
                ? !state.isAsc
                : true;
        const sortedItems = [...state.currentPageYoutubeItemsSortInfo]
            .sort((a, b) => {
                if (isAsc) {
                    return +a.viewCount - +b.viewCount;
                }
                return +b.viewCount - +a.viewCount;
            })
            .map((item) => item.id);
        if (
            state.currentPageItemsIds.find((item) =>
                item.includes("customCard")
            )
        ) {
            return {
                ...state,
                currentPageItemsIds: [...state.customCardIds, ...sortedItems],
                isAsc,
                filterType: FilterType.SortByViewCount
            };
        }
        return {
            ...state,
            currentPageItemsIds: [...sortedItems],
            isAsc,
            filterType: FilterType.SortByViewCount
        };
    })
);
