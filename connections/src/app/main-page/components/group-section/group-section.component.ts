import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';

import {
    clearCreateGroupInfo,
    clearDeleteGroupInfo,
    groupsListLoading,
    groupsListUpdate
} from '../../../redux/actions/groups.actions';
import {
    AppState,
    ErrorType,
    GroupsDataState,
    StatusState
} from '../../../redux/state.models';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { GroupListItemComponent } from '../group-list-item/group-list-item.component';

@Component({
    selector: 'app-group-section',
    standalone: true,
    imports: [
        GroupListItemComponent,
        CommonModule,
        MatProgressSpinnerModule,
        MatButtonModule
    ],
    templateUrl: './group-section.component.html',
    styleUrl: './group-section.component.scss'
})
export class GroupSectionComponent implements OnInit, OnChanges, OnDestroy {
    @Input() groupsListItems: GroupsDataState[] | null | undefined;
    @Input() groupsStatus: string | null | undefined;
    @Input() errorType: ErrorType | null | undefined;
    @Input() countdownTimestamp: number | undefined | null;
    @Input() createGroupStatus: string | null | undefined;
    @Input() deleteGroupStatus: string | null | undefined;
    status = StatusState;
    countdown: number = 0;
    public countdownSubscription: Subscription | undefined;
    private dialogRef: MatDialogRef<CreateGroupDialogComponent> | undefined;

    constructor(
        private _snackBar: MatSnackBar,
        public store: Store<AppState>,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.startCountdown(this.countdownTimestamp!);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['createGroupStatus'] &&
            this.createGroupStatus === StatusState.Success
        ) {
            this.dialogRef?.close();
            this.openSnackBar('Group was created successfully.', 'Close', {
                duration: 3000
            });
            this.store.dispatch(clearCreateGroupInfo());
        } else if (
            changes['createGroupStatus'] &&
            this.createGroupStatus === StatusState.Failed
        ) {
            this.openSnackBar(
                'Attempt failed. Check your connection and try again.',
                'Close',
                {
                    duration: 3000
                }
            );
            this.store.dispatch(clearCreateGroupInfo());
        }
        if (
            changes['deleteGroupStatus'] &&
            this.deleteGroupStatus === StatusState.Success
        ) {
            this.openSnackBar('Group was deleted successfully.', 'Close', {
                duration: 3000
            });
            this.store.dispatch(clearDeleteGroupInfo());
        } else if (
            changes['deleteGroupStatus'] &&
            this.deleteGroupStatus === StatusState.Failed
        ) {
            this.openSnackBar(
                'Attempt failed. Check your connection and try again.',
                'Close',
                {
                    duration: 3000
                }
            );
            this.store.dispatch(clearDeleteGroupInfo());
        }
    }

    ngOnDestroy(): void {
        this.store.dispatch(clearCreateGroupInfo());
    }

    openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
        this._snackBar.open(message, action, config);
    }

    startCountdown(countdownTimestamp: number) {
        this.countdown = Math.floor(
            60 - (new Date().getTime() - countdownTimestamp) / 1000
        );

        this.countdownSubscription = interval(1000).subscribe(() => {
            this.countdown--;

            if (this.countdown <= 0) {
                this.countdownSubscription?.unsubscribe();
            }
        });
    }

    updateGroupsListItems() {
        const currentDate = new Date().getTime();
        this.store.dispatch(groupsListUpdate({ currentDate }));
        this.startCountdown(currentDate);
        this.store.dispatch(groupsListLoading());
    }

    openDialog(): void {
        this.dialogRef = this.dialog.open(CreateGroupDialogComponent);
    }
}
