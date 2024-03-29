import { createAction, props } from '@ngrx/store';

import { ErrorState, ProfileDataState } from '../state.models';

export const profileLoading = createAction(
    '[ProfilePageComponent] profileLoading'
);

export const profileSuccess = createAction(
    '[ProfilePageComponent] profileSuccess',
    props<{ data: ProfileDataState }>()
);

export const profileFailed = createAction(
    '[ProfilePageComponent] profileFailed',
    props<{ error: { error: ErrorState } }>()
);

export const profileUpdate = createAction(
    '[ProfilePageComponent] profileUpdate',
    props<{ name: string }>()
);

export const profileSignOut = createAction(
    '[ProfilePageComponent] profileSignOut'
);
