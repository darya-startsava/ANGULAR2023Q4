import { createReducer, on } from "@ngrx/store";
import { getDateStatus } from "src/app/youtube/utils";

import { clearDetailedInformationStore } from "../actions/delete.actions";
import { searchVideoByIdSuccess } from "../actions/search.actions";
import { VideoItem } from "../state.models";

const initialState: VideoItem | null = null;

export const currentVideoReducer = createReducer<VideoItem>(
    initialState,
    on(searchVideoByIdSuccess, (state, { data }): VideoItem => {
        const { items } = data;
        const firstItem = items[0];
        const { snippet, statistics } = firstItem;
        return {
            isCustomCard: false,
            id: firstItem.id,
            title: snippet.title,
            description: snippet.description,
            image: snippet.thumbnails.high.url,
            publishedAt: snippet.publishedAt,
            statistics: { ...statistics },
            dateStatus: getDateStatus(snippet.publishedAt)
        };
    }),
    on(clearDetailedInformationStore, () => null)
);
