import { createAction, props } from "@ngrx/store";

export const goToPreviousPage = createAction(
    "[MainPage Component] goToPreviousPage",
    props<{ nextPageToken:string, prevPageToken:string }>()
);

export const goToNextPage = createAction(
    "[MainPage Component] goToNextPage",
    props<{ nextPageToken: string; prevPageToken: string }>()
);
