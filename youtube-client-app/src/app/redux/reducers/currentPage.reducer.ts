import { createReducer, on } from "@ngrx/store";

import { createCard } from "../actions/card.actions";

const initialState: Array<string> = [];

export const currentPageReducer = createReducer<Array<string>>(
    initialState,
    on(createCard, (state, { id }): Array<string> => [...state, id])
);
