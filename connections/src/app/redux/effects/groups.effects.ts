import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { GroupsListResponse } from '../../main-page/models/group.models';
import { GroupService } from '../../main-page/services/group.service';
import { groupsListFailed, groupsListLoading, groupsListSuccess } from '../actions/groups.actions';
import { GroupsDataState } from '../state.models';

@Injectable()
export class GroupsEffects {
    groupLoading$ = createEffect(() =>
        this.actions$.pipe(
            ofType(groupsListLoading),
            mergeMap(() =>
                this.groupService.getGroupsList().pipe(
                    map((data: GroupsListResponse) => {
                        const groupsData: GroupsDataState[] = data.Items.map(
                            (item) => ({
                                id: item.id.S,
                                name: item.name.S,
                                createdAt: item.createdAt.S,
                                createdBy: item.createdBy.S
                            })
                        );
                        return groupsListSuccess({
                            data: groupsData
                        });
                    }),
                    catchError((error) => of(groupsListFailed({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private groupService: GroupService
    ) {}
}
