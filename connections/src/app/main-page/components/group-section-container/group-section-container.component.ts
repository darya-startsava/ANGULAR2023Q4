import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';

import { groupsListLoading } from '../../../redux/actions/groups.actions';
import {
    selectCountdownTimestamp,
    selectCreateGroupStatus,
    selectErrorType,
    selectGroupsData,
    selectGroupsStatus
} from '../../../redux/selectors/groups.selector';
import {
    AppState,
    ErrorType,
    GroupsDataState,
    StatusState
} from '../../../redux/state.models';
import { GroupSectionComponent } from '../group-section/group-section.component';

@Component({
    selector: 'app-group-section-container',
    standalone: true,
    imports: [GroupSectionComponent, CommonModule],
    templateUrl: './group-section-container.component.html',
    styleUrl: './group-section-container.component.scss'
})
export class GroupSectionContainerComponent implements OnInit, OnDestroy {
    public data$: Observable<GroupsDataState[]>;
    public groupsStatus$: Observable<StatusState>;
    public errorType$: Observable<ErrorType | null>;
    public countdownTimestamp$: Observable<number>;
    public createGroupStatus$: Observable<StatusState>;
    private subscriptions: Subscription[] = [];
    constructor(
        public store: Store<AppState>,
        private _snackBar: MatSnackBar
    ) {
        this.data$ = store.select(selectGroupsData);
        this.groupsStatus$ = store.select(selectGroupsStatus);
        this.errorType$ = store.select(selectErrorType);
        this.countdownTimestamp$ = store.select(selectCountdownTimestamp);
        this.createGroupStatus$ = store.select(selectCreateGroupStatus);

        const subscription = this.groupsStatus$.subscribe((status) => {
            this.errorType$.pipe(take(1)).subscribe((errorType) => {
                if (
                    status === StatusState.Failed &&
                    (errorType === ErrorType.InvalidUserDataException ||
                        errorType === ErrorType.InvalidTokenException)
                ) {
                    this.openSnackBar(
                        'Attempt failed. Sign out and sign in again.',
                        'Close',
                        { duration: 3000 }
                    );
                } else if (status === StatusState.Failed) {
                    this.openSnackBar(
                        'Attempt failed. Check your connection and try again.',
                        'Close',
                        { duration: 3000 }
                    );
                }
            });
        });
        this.subscriptions.push(subscription);
    }

    ngOnInit(): void {
        this.groupsStatus$.pipe(take(1)).subscribe((status) => {
            if (status === StatusState.Init) {
                this.store.dispatch(groupsListLoading());
            }
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }

    openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
        this._snackBar.open(message, action, config);
    }
}
