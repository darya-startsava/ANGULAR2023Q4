import { createReducer, on } from '@ngrx/store';
import {
    signUpFailed,
    signUpLoading,
    signUpSuccess
} from '../actions/signUp.actions';
import { SignUpState, StatusState } from '../state.models';

const initialState: SignUpState = { data: null, status: StatusState.Init };

export const signUpReducer = createReducer<SignUpState>(
    initialState,
    on(
        signUpLoading,
        (state, { data }): SignUpState => ({
            data,
            status: StatusState.Loading
        })
    ),
    on(
        signUpSuccess,
      (state, { data }): SignUpState => {
        console.log('signUp success:', data);
        return {
          data,
          status: StatusState.Success
        }
      }
    ),
    on(signUpFailed, (state, { error }): SignUpState => {
        console.log('signUp error:', error);
        return {
            ...state,
            status: StatusState.Failed
        };
    })
);
