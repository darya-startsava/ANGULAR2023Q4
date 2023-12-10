import { createReducer, on } from "@ngrx/store";

import {
    goToNextPageSuccess,
    goToPreviousPageSuccess
} from "../actions/pagination.actions";
import { searchSuccess } from "../actions/search.actions";
import { PaginationState } from "../state.models";

const initialState: PaginationState = {
    input: "",
    currentPage: 1,
    nextPageToken: "",
    prevPageToken: ""
};

export const paginationReducer = createReducer<PaginationState>(
    initialState,
    on(
        goToNextPageSuccess,
        (state, { nextPageToken, prevPageToken }): PaginationState => ({
            ...state,
            currentPage: state.currentPage + 1,
            nextPageToken,
            prevPageToken
        })
    ),
    on(
        goToPreviousPageSuccess,
        (state, { nextPageToken, prevPageToken }): PaginationState => ({
            ...state,
            currentPage: state.currentPage - 1,
            nextPageToken,
            prevPageToken: state.currentPage - 1 === 1 ? "" : prevPageToken
        })
    ),
    on(
        searchSuccess,
        (state, { nextPageToken, input }): PaginationState => ({
            currentPage: 1,
            nextPageToken,
            prevPageToken: "",
            input
        })
    )
);
