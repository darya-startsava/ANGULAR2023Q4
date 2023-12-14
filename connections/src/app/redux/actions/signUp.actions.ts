import { createAction, props } from '@ngrx/store';
import { ErrorState, SignUpDataState } from '../state.models';

export const signUpLoading = createAction(
    '[SignUpPageComponent] signUpLoading',
    props<{ data: SignUpDataState }>()
);

export const signUpSuccess = createAction(
    '[SignUpPageComponent] signUpSuccess',
    props<{ data: SignUpDataState }>()
);

export const signUpFailed = createAction(
    '[SignUpPageComponent] signUpFailed',
    props<{ error: ErrorState }>()
);
