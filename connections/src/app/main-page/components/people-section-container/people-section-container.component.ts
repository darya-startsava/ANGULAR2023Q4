import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';

import {
    clearCreateConversationInfo,
    peopleLoading
} from '../../../redux/actions/people.actions';
import {
    selectCountdownTimestamp,
    selectCreateConversationErrorType,
    selectCreateConversationStatus,
    selectErrorType,
    selectPeopleData,
    selectPeopleStatus
} from '../../../redux/selectors/people.selectors';
import {
    AppState,
    ErrorType,
    PeopleDataState,
    StatusState
} from '../../../redux/state.models';
import { PeopleSectionComponent } from '../people-section/people-section.component';

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
    public createConversationStatus$: Observable<StatusState>;
    public createConversationErrorType$: Observable<ErrorType | null>;
    private subscriptions: Subscription[] = [];

    constructor(
        public store: Store<AppState>,
        private _snackBar: MatSnackBar
    ) {
        this.data$ = store.select(selectPeopleData);
        this.peopleStatus$ = store.select(selectPeopleStatus);
        this.errorType$ = store.select(selectErrorType);
        this.countdownTimestamp$ = store.select(selectCountdownTimestamp);
        this.createConversationStatus$ = store.select(
            selectCreateConversationStatus
        );
        this.createConversationErrorType$ = store.select(
            selectCreateConversationErrorType
        );
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
                    this.store.dispatch(clearCreateConversationInfo());
                } else if (status === StatusState.Failed) {
                    this.openSnackBar(
                        'Attempt failed. Check your connection and try again.',
                        'Close',
                        { duration: 3000 }
                    );
                    this.store.dispatch(clearCreateConversationInfo());
                }
            });
        });
        this.subscriptions.push(subscription);
        const subscriptionCreateConversation =
            this.createConversationStatus$.subscribe((status) => {
                this.createConversationErrorType$
                    .pipe(take(1))
                    .subscribe((errorType) => {
                        if (
                            status === StatusState.Failed &&
                            (errorType === ErrorType.InvalidUserDataException ||
                                errorType === ErrorType.InvalidTokenException ||
                                errorType ===
                                    ErrorType.InvalidFormDataException)
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
        this.subscriptions.push(subscriptionCreateConversation);
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
        this.store.dispatch(clearCreateConversationInfo());
    }

    openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
        this._snackBar.open(message, action, config);
    }
}
