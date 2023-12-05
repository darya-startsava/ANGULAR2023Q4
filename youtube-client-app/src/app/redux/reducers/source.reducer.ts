import { createReducer, on } from "@ngrx/store";

import { createCard } from "../actions/card.actions";
import { Source } from "../state.models";

export const initialState: Source = {};

export const sourceReducer = createReducer<Source>(
    initialState,
    on(createCard, (state, { id, createdCard }) => ({
        ...state,
        [id]: createdCard
    }))
);
