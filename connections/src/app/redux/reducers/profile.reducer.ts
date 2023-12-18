import { createReducer, on } from '@ngrx/store';

import {
    profileFailed,
    profileLoading,
    profileSignOut,
    profileSuccess,
    profileUpdate
} from '../actions/profile.actions';
import { ProfileState, StatusState } from '../state.models';

const initialState: ProfileState = {
    data: null,
    status: StatusState.Init,
    error: null
};

export const profileReducer = createReducer<ProfileState>(
    initialState,
    on(profileLoading, (state) => ({
        ...state,
        status: StatusState.Loading
    })),
    on(profileSuccess, (state, { data }) => ({
        data,
        status: StatusState.Success,
        error: null
    })),
    on(profileFailed, (state, { error }) => ({
        data: null,
        status: StatusState.Failed,
        error: error.error.type
    })),
    on(profileUpdate, (state, { name }) => ({
        ...state,
        data: { ...state.data, name }
    })),
    on(profileSignOut, () => initialState)
);
