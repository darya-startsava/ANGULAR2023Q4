import { createReducer, on } from "@ngrx/store";

import { createCard, deleteCustomCard } from "../actions/card.actions";
import {
    goToNextPageSuccess,
    goToPreviousPageSuccess
} from "../actions/pagination.action";
import { searchSuccess } from "../actions/search.actions";
import { CurrentPageState } from "../state.models";

const initialState: CurrentPageState = {
    customCardIds: [],
    currentPageItemsIds: []
};

export const currentPageReducer = createReducer<CurrentPageState>(
    initialState,
    on(
        createCard,
        (state, { id }): CurrentPageState => ({
            ...state,
            customCardIds: [...state.customCardIds, id]
        })
    ),
    on(
        searchSuccess,
        (state, { data }): CurrentPageState => ({
            ...state,
            currentPageItemsIds: [
                ...state.customCardIds,
                ...data.items.map((item) => item.id)
            ]
        })
    ),
    on(
        deleteCustomCard,
        (state, { id }): CurrentPageState => ({
            currentPageItemsIds: [
                ...state.currentPageItemsIds.filter((item) => item !== id)
            ],
            customCardIds: [
                ...state.customCardIds.filter((item) => item !== id)
            ]
        })
    ),
    on(
        goToNextPageSuccess,
        (state, { data }): CurrentPageState => ({
            ...state,
            currentPageItemsIds: [...data.items.map((item) => item.id)]
        })
    ),
    on(
        goToPreviousPageSuccess,
        (state, { data, prevPageToken }): CurrentPageState => {
            if (prevPageToken) {
                return {
                    ...state,
                    currentPageItemsIds: [...data.items.map((item) => item.id)]
                };
            }
            return {
                ...state,
                currentPageItemsIds: [
                    ...state.customCardIds,
                    ...data.items.map((item) => item.id)
                ]
            };
        }
    )
);
