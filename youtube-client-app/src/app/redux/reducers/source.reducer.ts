import { createReducer, on } from "@ngrx/store";

import { createCard } from "../actions/card.actions";
import { SourceState } from "../state.models";

const initialState: SourceState = {};

export const sourceReducer = createReducer<SourceState>(
    initialState,
    on(
        createCard,
        (state, { id, createdCard }): SourceState => ({
            ...state,
            [id]: createdCard
        })
    )
);
