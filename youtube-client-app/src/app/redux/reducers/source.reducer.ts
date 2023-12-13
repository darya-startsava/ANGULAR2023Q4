import { createReducer, on } from "@ngrx/store";
import { ResponseSnippet } from "src/app/youtube/models/search-response.model";
import { getDateStatus } from "src/app/youtube/utils";

import { createCard, deleteCustomCard } from "../actions/card.actions";
import {
    goToNextPageSuccess,
    goToPreviousPageSuccess
} from "../actions/pagination.actions";
import { searchSuccess } from "../actions/search.actions";
import { SourceState, VideoItem } from "../state.models";

function putDataToSource(data: ResponseSnippet): VideoItem[] {
    return data.items.map((item) => ({
        isCustomCard: false,
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        image: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        statistics: item.statistics,
        dateStatus: getDateStatus(item.snippet.publishedAt)
    }));
}

const initialState: SourceState = {};
export const sourceReducer = createReducer<SourceState>(
    initialState,
    on(
        createCard,
        (state, { id, createdCard }): SourceState => ({
            ...state,
            [id]: {
                isCustomCard: true,
                id,
                title: createdCard.title,
                description: createdCard.description,
                image: createdCard.image,
                publishedAt: createdCard.date,
                statistics: null,
                dateStatus: getDateStatus(createdCard.date)
            }
        })
    ),
    on(searchSuccess, (state, { data }): SourceState => {
        const selectedVideoProperties = putDataToSource(data);
        return {
            ...state,
            ...selectedVideoProperties.reduce(
                (accumulator, item) => ({ ...accumulator, [item.id]: item }),
                {}
            )
        };
    }),
    on(deleteCustomCard, (state, { id }): SourceState => {
        const { [id]: deletedCard, ...newState } = state;
        return newState;
    }),
    on(goToNextPageSuccess, (state, { data }): SourceState => {
        const selectedVideoProperties = putDataToSource(data);
        return {
            ...state,
            ...selectedVideoProperties.reduce(
                (accumulator, item) => ({ ...accumulator, [item.id]: item }),
                {}
            )
        };
    }),
    on(goToPreviousPageSuccess, (state, { data }): SourceState => {
        const selectedVideoProperties = putDataToSource(data);
        return {
            ...state,
            ...selectedVideoProperties.reduce(
                (accumulator, item) => ({ ...accumulator, [item.id]: item }),
                {}
            )
        };
    })
);
