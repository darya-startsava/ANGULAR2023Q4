import { createSelector } from "@ngrx/store";

import { AppState, SourceState } from "../state.models";

export const selectFavoriteIds = (state: AppState) => state.favorite;

const selectSource = (state: AppState) => state.source;

export const selectFavorite = createSelector(
    selectSource,
    selectFavoriteIds,
    (source: SourceState, favoriteIds: Array<string>) =>
        favoriteIds.map((item) => source[item])
);
