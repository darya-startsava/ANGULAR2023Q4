import { AppState } from '../state.models';

export const selectSignUpStatus = (state: AppState) => state.signUp.status;

export const selectSignUpErrorMessage = (state: AppState) =>
    state.signUp.error.message;

export const selectSignUpErrorType = (state: AppState) =>
    state.signUp.error.type;
