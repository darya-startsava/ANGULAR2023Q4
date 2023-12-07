import { createSelector } from "@ngrx/store";

import { AppState, SourceState } from "../state.models";

const selectSource = (state: AppState) => state.source;

const selectCurrentPage = (state: AppState) => state.currentPageItems;

export const selectCurrentPageItems = createSelector(
    selectSource,
    selectCurrentPage,
    (source: SourceState, currentPageItems: Array<string>) =>
        currentPageItems.map((item) => source[item])
);
