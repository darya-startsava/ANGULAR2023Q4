import { AppState } from "../state.models";

export const selectFavorite = (state: AppState) => state.favorite;
