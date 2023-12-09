import { AppState } from "../state.models";

export const selectCurrentPage = (state: AppState) =>
    state.pagination.currentPage;

export const selectPagination = (state: AppState) => state.pagination;
