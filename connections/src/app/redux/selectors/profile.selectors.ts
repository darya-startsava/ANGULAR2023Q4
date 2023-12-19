import { AppState } from '../state.models';

export const selectProfileStatus = (state: AppState) => state.profile.status;

export const selectProfileDataUid = (state: AppState) =>
    state.profile.data?.uid;
export const selectProfileDataEmail = (state: AppState) =>
    state.profile.data?.email;
export const selectProfileDataName = (state: AppState) =>
    state.profile.data?.name;
export const selectProfileDataCreatedAt = (state: AppState) =>
    state.profile.data?.createdAt;

export const selectErrorType = (state: AppState) => state.profile.error;
