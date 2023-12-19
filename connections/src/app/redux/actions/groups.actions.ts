import { createAction, props } from '@ngrx/store';

import { ErrorState, GroupsDataState } from '../state.models';

export const groupsListLoading = createAction(
    '[GroupPageContainerComponent] groupsListLoading'
);

export const groupsListSuccess = createAction(
    '[GroupPageContainerComponent] groupsListSuccess',
    props<{ data: GroupsDataState[] }>()
);

export const groupsListFailed = createAction(
    '[GroupPageContainerComponent] groupsListFailed',
    props<{ error: { error: ErrorState } }>()
);

export const groupsListUpdate = createAction(
    '[GroupPageContainerComponent] groupsListUpdate',
    props<{ currentDate: number }>()
);
