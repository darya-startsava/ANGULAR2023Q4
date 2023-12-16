import { AppState } from '../state.models';

export const selectSignInStatus = (state: AppState) => state.signIn.status;

export const selectSignInErrorMessage = (state: AppState) =>
    state.signIn.error.message;

export const selectSignInErrorType = (state: AppState) =>
    state.signIn.error.type;
