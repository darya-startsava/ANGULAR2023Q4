import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    AppState,
    ErrorType,
    PeopleDataState,
    StatusState
} from '../../../redux/state.models';
import { PeopleSectionComponent } from '../people-section/people-section.component';
import { Observable, Subscription, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import {
    selectCountdownTimestamp,
    selectErrorType,
    selectPeopleData,
    selectPeopleStatus
} from '../../../redux/selectors/people.selectors';
import { peopleLoading } from '../../../redux/actions/people.actions';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-people-section-container',
    standalone: true,
    imports: [CommonModule, PeopleSectionComponent],
    templateUrl: './people-section-container.component.html',
    styleUrl: './people-section-container.component.scss'
})
export class PeopleSectionContainerComponent implements OnInit, OnDestroy {
    public data$: Observable<PeopleDataState[]>;
    public peopleStatus$: Observable<StatusState>;
    public errorType$: Observable<ErrorType | null>;
    public countdownTimestamp$: Observable<number>;
    private subscriptions: Subscription[] = [];

    constructor(
        public store: Store<AppState>,
        private _snackBar: MatSnackBar
    ) {
        this.data$ = store.select(selectPeopleData);
        this.peopleStatus$ = store.select(selectPeopleStatus);
        this.errorType$ = store.select(selectErrorType);
        this.countdownTimestamp$ = store.select(selectCountdownTimestamp);
        const subscription = this.peopleStatus$.subscribe((status) => {
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
        this.peopleStatus$.pipe(take(1)).subscribe((status) => {
            if (status === StatusState.Init) {
                this.store.dispatch(peopleLoading());
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
