import { createSelector } from "@ngrx/store";

import { AppState, SourceState, VideoItem } from "../state.models";

const selectSource = (state: AppState) => state.source;

const selectCurrentPage = (state: AppState) =>
    state.currentPageItems.currentPageItemsIds;

export const selectCustomItems = (state: AppState) =>
    state.currentPageItems.customCardIds;

export const selectCurrentPageItems = createSelector(
    selectSource,
    selectCurrentPage,
    (source: SourceState, currentPageItemsIds: Array<string>) =>
        currentPageItemsIds.map((item) => source[item])
);
