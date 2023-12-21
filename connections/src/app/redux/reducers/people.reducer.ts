import { createReducer, on } from '@ngrx/store';

import {
    peopleFailed,
    peopleLoading,
    peopleSuccess,
    peopleUpdate
} from '../actions/people.actions';
import { profileSignOut } from '../actions/profile.actions';
import { PeopleState, StatusState } from '../state.models';

const initialState = {
    data: [],
    status: StatusState.Init,
    error: null,
    countdownTimestamp: 0,
};

export const peopleReducer = createReducer<PeopleState>(
    initialState,
    on(peopleLoading, (state) => ({
        ...state,
        error: null,
        countdownTimestamp: new Date().getTime(),
        status: StatusState.Loading
    })),
    on(peopleSuccess, (state, { data }) => ({
        ...state,
        data,
        status: StatusState.Success,
        error: null,
        countdownTimestamp: state.countdownTimestamp,
    })),
    on(peopleFailed, (state, { error }) => ({
        ...state,
        data: [],
        status: StatusState.Failed,
        error: error.error.type,
        countdownTimestamp: state.countdownTimestamp
    })),

    on(peopleUpdate, (state) => ({
        ...state,
        error: null,
        countdownTimestamp: new Date().getTime(),
        status: StatusState.Init
    })),
    on(profileSignOut, () => initialState)
);
