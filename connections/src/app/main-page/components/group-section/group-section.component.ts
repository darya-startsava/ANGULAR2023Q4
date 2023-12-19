import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import {
    groupsListLoading,
    groupsListUpdate
} from '../../../redux/actions/groups.actions';
import {
    AppState,
    ErrorType,
    GroupsDataState,
    StatusState
} from '../../../redux/state.models';
import { GroupListItemComponent } from '../group-list-item/group-list-item.component';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';

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
export class GroupSectionComponent implements OnInit, OnChanges {
    @Input() groupsListItems: GroupsDataState[] | null | undefined;
    @Input() groupsStatus: string | null | undefined;
    @Input() errorType: ErrorType | null | undefined;
    @Input() countdownTimestamp: number | undefined | null;
    @Input() createGroupStatus: string | null | undefined;
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
        }
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

        this.dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed');
            // this.animal = result;
        });
    }
}
