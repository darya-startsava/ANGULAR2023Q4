import { AppState } from '../state.models';

export const selectPeopleStatus = (state: AppState) => state.people.status;

export const selectPeopleData = (state: AppState) => state.people.data;

export const selectErrorType = (state: AppState) => state.people.error;

export const selectCountdownTimestamp = (state: AppState) =>
    state.people.countdownTimestamp;

export const selectCreateConversationStatus = (state: AppState) =>
    state.people.createConversationStatus;

export const selectCreateConversationErrorType = (state: AppState) =>
    state.people.createConversationError;
