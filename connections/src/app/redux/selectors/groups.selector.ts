import { AppState } from '../state.models';

export const selectGroupsStatus = (state: AppState) => state.groups.status;

export const selectGroupsData = (state: AppState) => state.groups.data;

export const selectErrorType = (state: AppState) => state.groups.error;

export const selectCountdownTimestamp = (state: AppState) =>
    state.groups.countdownTimestamp;
