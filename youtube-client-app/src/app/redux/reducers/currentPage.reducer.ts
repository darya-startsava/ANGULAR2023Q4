import { createReducer, on } from "@ngrx/store";

import { createCard } from "../actions/card.actions";
import { searchSuccess } from "../actions/search.actions";

const initialState: Array<string> = [];

export const currentPageReducer = createReducer<Array<string>>(
    initialState,
    on(createCard, (state, { id }): Array<string> => [...state, id]),
    on(
        searchSuccess,
        (state, { data }): Array<string> => [
            ...state,
            ...data.items.map((item) => item.id)
        ]
    )
);
