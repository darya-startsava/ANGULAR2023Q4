import { createReducer, on } from "@ngrx/store";

import { goToNextPage, goToPreviousPage } from "../actions/pagination.action";
import { searchSuccess } from "../actions/search.actions";
import { PaginationState } from "../state.models";

const initialState: PaginationState = {
    currentPage: 1,
    nextPageToken: "",
    prevPageToken: ""
};

export const paginationReducer = createReducer<PaginationState>(
    initialState,
    on(
        goToNextPage,
        (state, { nextPageToken, prevPageToken }): PaginationState => ({
            currentPage: state.currentPage + 1,
            nextPageToken,
            prevPageToken
        })
    ),
    on(
        goToPreviousPage,
        (state, { nextPageToken, prevPageToken }): PaginationState => ({
            currentPage: state.currentPage - 1,
            nextPageToken,
            prevPageToken
        })
    ),
    on(
        searchSuccess,
        (state, { nextPageToken }): PaginationState => ({
            ...initialState,
            nextPageToken
        })
    )
);
