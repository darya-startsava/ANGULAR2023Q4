import { createSelector } from "@ngrx/store";

import { AppState, SourceState } from "../state.models";
import { selectRouteParams } from "./router.selectors";

const selectSource = (state: AppState) => state.source;
export const selectCurrentVideo = (state: AppState) => state.currentVideo;

export const selectCurrentItem = createSelector(
    selectSource,
    selectRouteParams,
    (source: SourceState, { id }) => source[id]
);
