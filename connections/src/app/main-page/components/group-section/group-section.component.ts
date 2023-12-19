import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';

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
export class GroupSectionComponent implements OnInit {
    @Input() groupsListItems: GroupsDataState[] | null | undefined;
    @Input() groupsStatus: string | null | undefined;
    @Input() errorType: ErrorType | null | undefined;
    @Input() countdownTimestamp: number | undefined | null;
    status = StatusState;

    countdown: number = 0;
    public countdownSubscription: Subscription | undefined;

    constructor(
        private _snackBar: MatSnackBar,
        public store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.startCountdown(this.countdownTimestamp!);
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
}
