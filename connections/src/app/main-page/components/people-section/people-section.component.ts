import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';

import {
    peopleLoading,
    peopleUpdate
} from '../../../redux/actions/people.actions';
import {
    AppState,
    ErrorType,
    PeopleDataState,
    StatusState
} from '../../../redux/state.models';
import { DeleteUserPipe } from '../../pipes/deleteUser.pipe';
import { PeopleListItemComponent } from '../people-list-item/people-list-item.component';

@Component({
    selector: 'app-people-section',
    standalone: true,
    imports: [
        PeopleListItemComponent,
        CommonModule,
        MatProgressSpinnerModule,
        DeleteUserPipe,
        MatButtonModule
    ],
    templateUrl: './people-section.component.html',
    styleUrl: './people-section.component.scss'
})
export class PeopleSectionComponent implements OnInit {
    @Input() peopleItems: PeopleDataState[] | null | undefined;
    @Input() peopleStatus: string | null | undefined;
    @Input() errorType: ErrorType | null | undefined;
    @Input() countdownTimestamp: number | undefined | null;
    status = StatusState;
    countdown: number = 0;
    public countdownSubscription: Subscription | undefined;

    constructor(public store: Store<AppState>) {}

    ngOnInit(): void {
        this.startCountdown(this.countdownTimestamp!);
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

    updatePeopleListItems() {
        const currentDate = new Date().getTime();
        this.store.dispatch(peopleUpdate({ currentDate }));
        this.startCountdown(currentDate);
        this.store.dispatch(peopleLoading());
    }
}
