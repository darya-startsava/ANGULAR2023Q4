import { createReducer, on } from '@ngrx/store';

import {
    groupsListFailed,
    groupsListLoading,
    groupsListSuccess,
    groupsListUpdate
} from '../actions/groups.actions';
import { profileSignOut } from '../actions/profile.actions';
import { GroupsState, StatusState } from '../state.models';

const initialState: GroupsState = {
    data: [],
    status: StatusState.Init,
    error: null,
    countdownTimestamp: 0
};

export const groupsReducer = createReducer<GroupsState>(
    initialState,
    on(groupsListLoading, (state) => ({
        ...state,
        error: null,
        countdownTimestamp: new Date().getTime(),
        status: StatusState.Loading
    })),
    on(groupsListSuccess, (state, { data }) => {
        console.log(data);
        return {
            data,
            status: StatusState.Success,
            error: null,
            countdownTimestamp: state.countdownTimestamp
        };
    }),
    on(groupsListFailed, (state, { error }) => ({
        data: [],
        status: StatusState.Failed,
        error: error.error.type,
        countdownTimestamp: state.countdownTimestamp
    })),
    on(groupsListUpdate, (state) => ({
        ...state,
        error: null,
        countdownTimestamp: new Date().getTime(),
        status: StatusState.Init
    })),
    on(profileSignOut, () => initialState)
);
