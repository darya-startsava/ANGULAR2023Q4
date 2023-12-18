import { createReducer, on } from '@ngrx/store';

import { profileSignOut } from '../actions/profile.actions';
import {
    signInFailed,
    signInInitAfterFall,
    signInLoading,
    signInSuccess
} from '../actions/signIn.actions';
import { SignInState, StatusState } from '../state.models';

const initialState: SignInState = {
    data: null,
    status: StatusState.Init,
    error: { type: null, message: '' }
};

export const signInReducer = createReducer<SignInState>(
    initialState,
    on(
        signInLoading,
        (state, { data }): SignInState => ({
            data,
            status: StatusState.Loading,
            error: { type: null, message: '' }
        })
    ),
    on(
        signInSuccess,
        (state): SignInState => ({
            ...state,
            status: StatusState.Success,
            error: { type: null, message: '' }
        })
    ),
    on(
        signInFailed,
        (state, { error }): SignInState => ({
            ...state,
            status: StatusState.Failed,
            error: { type: error.error.type, message: error.error.message }
        })
    ),
    on(
        signInInitAfterFall,
        (state): SignInState => ({ ...state, status: StatusState.Init })
    ),
    on(profileSignOut, () => initialState)
);
