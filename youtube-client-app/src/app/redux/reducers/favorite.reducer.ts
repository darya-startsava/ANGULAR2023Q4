import { createReducer, on } from "@ngrx/store";

import { addToFavorite, removeFromFavorite } from "../actions/favorite.actions";

const initialState: Array<string> = [];

export const favoriteReducer = createReducer<Array<string>>(
    initialState,
    on(addToFavorite, (state, { id }): Array<string> => [...state, id]),
    on(
        removeFromFavorite,
        (state, { id }): Array<string> => state.filter((item) => item !== id)
    )
);
