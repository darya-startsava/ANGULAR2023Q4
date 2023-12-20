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

export const createGroupLoading = createAction(
    '[CreateGroupDialogComponent] createGroupLoading',
    props<{ name: string }>()
);

export const createGroupSuccess = createAction(
    '[CreateGroupDialogComponent] createGroupSuccess',
    props<{ name: string; id: string }>()
);

export const createGroupFailed = createAction(
    '[CreateGroupDialogComponent] createGroupFailed',
    props<{ error: { error: ErrorState } }>()
);

export const clearCreateGroupInfo = createAction(
    '[GroupSectionComponent] clearCreateGroupInfo'
);

export const deleteGroupLoading = createAction(
    '[GroupListItemComponent] deleteGroupLoading',
    props<{ id: string }>()
);

export const deleteGroupSuccess = createAction(
    '[GroupListItemComponent] deleteGroupSuccess',
    props<{ id: string }>()
);

export const deleteGroupFailed = createAction(
    '[GroupListItemComponent] deleteGroupFailed'
);

export const clearDeleteGroupInfo = createAction(
    '[GroupListItemComponent] clearDeleteGroupInfo'
);
