import { createAction, props } from '@ngrx/store';
import { ErrorState, SignUpDataState } from '../state.models';

export const signUpInitAfterFall = createAction(
    '[SignUpPageComponent] signUpInitAfterFall'
);

export const signUpLoading = createAction(
    '[SignUpPageComponent] signUpLoading',
    props<{ data: SignUpDataState }>()
);

export const signUpSuccess = createAction(
    '[SignUpPageComponent] signUpSuccess'
);

export const signUpFailed = createAction(
    '[SignUpPageComponent] signUpFailed',
    props<{ error: { error: ErrorState } }>()
);
