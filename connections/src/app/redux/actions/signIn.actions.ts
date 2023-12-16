import { createAction, props } from '@ngrx/store';

import { ErrorState, SignInDataState } from '../state.models';

export const signInInitAfterFall = createAction(
    '[SignInPageComponent] signInInitAfterFall'
);

export const signInLoading = createAction(
    '[SignInPageComponent] signInLoading',
    props<{ data: SignInDataState }>()
);

export const signInSuccess = createAction(
    '[SignInPageComponent] signInSuccess'
);

export const signInFailed = createAction(
    '[SignInPageComponent] signInFailed',
    props<{ error: { error: ErrorState } }>()
);
