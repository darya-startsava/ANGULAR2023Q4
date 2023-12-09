import { createAction, props } from "@ngrx/store";
import { ResponseSnippet } from "src/app/youtube/models/search-response.model";

export const goToNextPage = createAction("[MainPage Component] goToNextPage");

export const goToPreviousPage = createAction(
    "[MainPage Component] goToPreviousPage"
);

export const goToNextPageSuccess = createAction(
    "[MainPage Component] goToNextPageSuccess",
    props<{
        data: ResponseSnippet;
        nextPageToken: string;
        prevPageToken: string;
        input: string;
    }>()
);

export const goToPreviousPageSuccess = createAction(
    "[MainPage Component] goToPreviousPageSuccess",
    props<{
        data: ResponseSnippet;
        nextPageToken: string;
        prevPageToken: string;
        input: string;
    }>()
);
