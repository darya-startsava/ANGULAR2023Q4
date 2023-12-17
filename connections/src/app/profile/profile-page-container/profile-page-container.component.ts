import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';

import { profileLoading } from '../../redux/actions/profile.actions';
import {
    selectErrorType,
    selectProfileDataCreatedAt,
    selectProfileDataEmail,
    selectProfileDataName,
    selectProfileDataUid,
    selectProfileStatus
} from '../../redux/selectors/profile.selectors';
import { AppState, ErrorType, StatusState } from '../../redux/state.models';
import { ProfilePageComponent } from '../profile-page/profile-page.component';

@Component({
    selector: 'app-profile-page-container',
    standalone: true,
    imports: [CommonModule, ProfilePageComponent],
    templateUrl: './profile-page-container.component.html',
    styleUrl: './profile-page-container.component.scss'
})
export class ProfilePageContainerComponent implements OnInit, OnDestroy {
    public uid$: Observable<string | null | undefined>;
    public email$: Observable<string | null | undefined>;
    public name$: Observable<string | null | undefined>;
    public createdAt$: Observable<string | null | undefined>;
    private errorType$: Observable<ErrorType | null>;
    private profileStatus$: Observable<StatusState>;
    private subscriptions: Subscription[] = [];
    constructor(
        public store: Store<AppState>,
        private _snackBar: MatSnackBar
    ) {
        this.uid$ = store.select(selectProfileDataUid);
        this.email$ = store.select(selectProfileDataEmail);
        this.name$ = store.select(selectProfileDataName);
        this.createdAt$ = store.select(selectProfileDataCreatedAt);
        this.profileStatus$ = store.select(selectProfileStatus);
        this.errorType$ = store.select(selectErrorType);

        const subscription = this.profileStatus$.subscribe((status) => {
            this.errorType$.pipe(take(1)).subscribe((errorType) => {
                if (
                    status === StatusState.Failed &&
                    (errorType === ErrorType.InvalidFormDataException ||
                        errorType === ErrorType.InvalidTokenException ||
                        errorType === ErrorType.InvalidIDException)
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
        this.profileStatus$.pipe(take(1)).subscribe((status) => {
            if (status === StatusState.Init) {
                this.store.dispatch(profileLoading());
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
