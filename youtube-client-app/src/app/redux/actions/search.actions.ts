import { createAction, props } from "@ngrx/store";
import { ResponseSnippet } from "src/app/youtube/models/search-response.model";

export const searchVideos = createAction(
    "[HeaderInput Component] searchVideos",
    props<{ searchInput: string }>()
);

export const searchSuccess = createAction(
    "searchSuccess",
    props<{ data: ResponseSnippet }>()
);
