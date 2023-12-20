import { createReducer, on } from '@ngrx/store';

import {
    clearCreateGroupInfo,
    createGroupFailed,
    createGroupSuccess,
    deleteGroupFailed,
    deleteGroupSuccess,
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
    countdownTimestamp: 0,
    createGroupStatus: StatusState.Init,
    createGroupError: null,
    deleteGroupStatus: StatusState.Init
};

export const groupsReducer = createReducer<GroupsState>(
    initialState,
    on(groupsListLoading, (state) => ({
        ...state,
        error: null,
        countdownTimestamp: new Date().getTime(),
        status: StatusState.Loading
    })),
    on(groupsListSuccess, (state, { data }) => ({
        ...state,
        data,
        status: StatusState.Success,
        error: null,
        countdownTimestamp: state.countdownTimestamp,
        createGroupStatus: StatusState.Init,
        createGroupError: null
    })),
    on(groupsListFailed, (state, { error }) => ({
        ...state,
        data: [],
        status: StatusState.Failed,
        error: error.error.type,
        countdownTimestamp: state.countdownTimestamp,
        createGroupStatus: StatusState.Init,
        createGroupError: null
    })),
    on(groupsListUpdate, (state) => ({
        ...state,
        error: null,
        countdownTimestamp: new Date().getTime(),
        status: StatusState.Init,
        createGroupStatus: StatusState.Init,
        createGroupError: null
    })),
    on(createGroupSuccess, (state, { name, id }) => ({
        ...state,
        createGroupStatus: StatusState.Success,
        data: [
            ...state.data,
            {
                id,
                name,
                createdAt: new Date().toISOString(),
                createdBy: localStorage.getItem('uid')!
            }
        ]
    })),
    on(createGroupFailed, (state, { error }) => ({
        ...state,
        error: error.error.type,
        createGroupStatus: StatusState.Failed,
        createGroupError: error.error.type
    })),
    on(clearCreateGroupInfo, (state) => ({
        ...state,
        createGroupStatus: StatusState.Init,
        createGroupError: null
    })),
    on(deleteGroupSuccess, (state, { id }) => ({
        ...state,
        data: state.data.filter((group) => group.id !== id),
        deleteGroupStatus: StatusState.Success
    })),
    on(deleteGroupFailed, (state) => ({
        ...state,
        deleteGroupStatus: StatusState.Failed
    })),
    on(clearCreateGroupInfo, (state) => ({
        ...state,
        createGroupStatus: StatusState.Init
    })),

    on(profileSignOut, () => initialState)
);
