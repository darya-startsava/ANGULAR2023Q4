import { createReducer, on } from "@ngrx/store";

import { createCard } from "../actions/card.actions";
import { searchSuccess } from "../actions/search.actions";
import { SourceState } from "../state.models";

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
                statistics: null
            }
        })
    ),
    on(searchSuccess, (state, { data }): SourceState => {
        const selectedVideoProperties = data.items.map((item) => ({
            isCustomCard: false,
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            image: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
            statistics: item.statistics
        }));
        console.log({
            ...state,
            ...selectedVideoProperties.reduce(
                (accumulator, item) => ({ ...accumulator, [item.id]: item }),
                {}
            )
        });
        return {
            ...state,
            ...selectedVideoProperties.reduce(
                (accumulator, item) => ({ ...accumulator, [item.id]: item }),
                {}
            )
        };
    })
);
