import { createReducer, on } from '@ngrx/store';
import {
    signUpFailed,
    signUpInitAfterFall,
    signUpLoading,
    signUpSuccess
} from '../actions/signUp.actions';
import {SignUpState, StatusState } from '../state.models';

const initialState: SignUpState = {
    data: null,
    status: StatusState.Init,
    error: { type: null, message: '' }
};

export const signUpReducer = createReducer<SignUpState>(
    initialState,
    on(
        signUpLoading,
        (state, { data }): SignUpState => ({
            data,
            status: StatusState.Loading,
            error: { type: null, message: '' }
        })
    ),
    on(signUpSuccess, (state, { data }): SignUpState => {
        return {
            data,
            status: StatusState.Success,
            error: { type: null, message: '' }
        };
    }),
    on(signUpFailed, (state, { error }): SignUpState => {
        return {
            ...state,
            status: StatusState.Failed,
            error: { type: error.error.type, message: error.error.message }
        };
    }),
    on(
        signUpInitAfterFall,
        (state): SignUpState => ({ ...state, status: StatusState.Init })
    )
);
