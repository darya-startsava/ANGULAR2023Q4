import { createAction, props } from '@ngrx/store';

import { ErrorState, GroupsDataState } from '../state.models';
import { GroupMessageItem } from '../../main-page/models/group.models';

export const groupsListLoading = createAction(
    '[GroupSectionContainerComponent] groupsListLoading'
);

export const groupsListSuccess = createAction(
    '[GroupSectionContainerComponent] groupsListSuccess',
    props<{ data: GroupsDataState[] }>()
);

export const groupsListFailed = createAction(
    '[GroupSectionContainerComponent] groupsListFailed',
    props<{ error: { error: ErrorState } }>()
);

export const groupsListUpdate = createAction(
    '[GroupSectionContainerComponent] groupsListUpdate',
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

export const groupMessagesLoading = createAction(
    '[GroupPageContainerComponent] groupMessagesLoading',
    props<{ groupID: string }>()
);

export const groupMessagesSuccess = createAction(
    '[GroupPageContainerComponent] groupMassagesSuccess',
    props<{ messages: GroupMessageItem[]; groupID: string }>()
);

export const groupMessagesFailed = createAction(
    '[GroupPageContainerComponent] groupMessagesFailed',
    props<{ error: { error: ErrorState } }>()
);

export const groupsMessagesUpdate = createAction(
    '[GroupPageComponent] groupMessagesUpdate',
    props<{ currentDate: number }>()
);
