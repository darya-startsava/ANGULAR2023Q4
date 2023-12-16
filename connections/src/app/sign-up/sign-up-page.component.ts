import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    ReactiveFormsModule,
    Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';

import {
    signUpInitAfterFall,
    signUpLoading
} from '../redux/actions/signUp.actions';
import {
    selectSignUpErrorMessage,
    selectSignUpErrorType,
    selectSignUpStatus
} from '../redux/selectors/signUp.selectors';
import { AppState, ErrorType, StatusState } from '../redux/state.models';
import { anyLettersNameValidator } from './directives/any-letters-name.directive';
import { strongPasswordValidator } from './directives/strong-password.directive';
import { uniqueEmailValidator } from './directives/unique-email.directive';

@Component({
    selector: 'app-sign-up-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ],
    templateUrl: './sign-up-page.component.html',
    styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent implements OnDestroy {
    public hide = true;
    public signUpStatus$: Observable<StatusState>;
    public failed = StatusState.Failed;
    public loading = StatusState.Loading;
    public primaryDuplicationException = ErrorType.PrimaryDuplicationException;
    public errorMessage$: Observable<string>;
    public errorType$: Observable<ErrorType | null>;
    private subscriptions: Subscription[] = [];
    public takenEmails: Array<string> = [];
    signUpForm = this.formBuilder.group({
        name: this.formBuilder.control('', [
            Validators.required,
            Validators.maxLength(40),
            anyLettersNameValidator()
        ]),
        email: this.formBuilder.control('', [
            Validators.required,
            Validators.email,
            uniqueEmailValidator(this.takenEmails)
        ]),
        password: this.formBuilder.control('', [
            Validators.required,
            strongPasswordValidator()
        ])
    });

    constructor(
        private store: Store<AppState>,
        public formBuilder: FormBuilder,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
        this.signUpStatus$ = store.select(selectSignUpStatus);
        this.errorMessage$ = store.select(selectSignUpErrorMessage);
        this.errorType$ = store.select(selectSignUpErrorType);

        const subscription = this.signUpForm.valueChanges.subscribe(() => {
            this.signUpStatus$.pipe(take(1)).subscribe((status) => {
                if (status === StatusState.Failed) {
                    this.store.dispatch(signUpInitAfterFall());
                }
            });
        });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }

    openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
        this._snackBar.open(message, action, config);
    }

    signUp(): void {
        const data = this.signUpForm.value;
        this.takenEmails.push(data.email || '');
        const subscription = this.signUpStatus$.subscribe((status) => {
            this.errorMessage$.pipe(take(1)).subscribe((errorMessage) => {
                this.errorType$.pipe(take(1)).subscribe((errorType) => {
                    if (status === StatusState.Success) {
                        this.openSnackBar(
                            'New account was created. Sign in.',
                            'Close',
                            {
                                duration: 3000
                            }
                        );
                        this.router.navigate(['/signin']);
                    }
                    if (
                        status === StatusState.Failed &&
                        errorType === ErrorType.PrimaryDuplicationException
                    ) {
                        this.openSnackBar(
                            `Attempt failed. ${errorMessage}`,
                            'Close',
                            {
                                duration: 3000
                            }
                        );
                    } else if (status === StatusState.Failed) {
                        this.openSnackBar(
                            'Attempt failed. Check your connection and try again.',
                            'Close',
                            {
                                duration: 3000
                            }
                        );
                    }
                });
            });
        });
        this.subscriptions.push(subscription);
        this.store.dispatch(signUpLoading({ data }));
    }

    get name(): AbstractControl | null {
        return this.signUpForm.get('name');
    }

    get email(): AbstractControl | null {
        return this.signUpForm.get('email');
    }

    get password(): AbstractControl | null {
        return this.signUpForm.get('password');
    }
}
