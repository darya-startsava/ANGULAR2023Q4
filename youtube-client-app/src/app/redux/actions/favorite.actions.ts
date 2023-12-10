import { createAction, props } from "@ngrx/store";

export const addToFavorite = createAction(
    "[MainPage Component] addToFavorite",
    props<{ id: string }>()
);

export const removeFromFavorite = createAction(
    "[MainPage Component] removeFromFavorite",
    props<{ id: string }>()
);
