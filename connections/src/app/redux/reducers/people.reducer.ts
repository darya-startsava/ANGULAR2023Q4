import { createReducer, on } from '@ngrx/store';

import {
    clearCreateConversationInfo,
    createConversationFailed,
    createConversationLoading,
    createConversationSuccess,
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
    createConversationStatus: StatusState.Init,
    createConversationError: null
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
        countdownTimestamp: state.countdownTimestamp
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
    on(createConversationLoading, (state) => ({
        ...state,
        createConversationStatus: StatusState.Loading
    })),
    on(createConversationSuccess, (state, { companionID, conversationID }) => ({
        ...state,
        createConversationStatus: StatusState.Success,
        data: state.data.map((person) => {
            if (person.uid === companionID) {
                return { ...person, conversationID };
            }
            return person;
        })
    })),
    on(createConversationFailed, (state, { error }) => ({
        ...state,
        error: error.error.type,
        createConversationStatus: StatusState.Failed,
        createConversationError: error.error.type
    })),
    on(clearCreateConversationInfo, (state) => ({
        ...state,
        createConversationStatus: StatusState.Init,
        createConversationError: null
    })),
    on(profileSignOut, () => initialState)
);
