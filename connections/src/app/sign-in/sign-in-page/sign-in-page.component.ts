import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from '@angular/core';
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
import { Subscription } from 'rxjs';

import {
    signInInitAfterFall,
    signInLoading
} from '../../redux/actions/signIn.actions';
import { AppState, ErrorType, StatusState } from '../../redux/state.models';

@Component({
    selector: 'app-sign-in-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './sign-in-page.component.html',
    styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent implements OnDestroy, OnChanges {
    @Input() signInStatus: StatusState | undefined | null;
    @Input() errorMessage: string | undefined | null;
    @Input() errorType: ErrorType | undefined | null;
    public hide = true;
    public failed = StatusState.Failed;
    public loading = StatusState.Loading;
    private subscriptions: Subscription[] = [];
    signInForm = this.formBuilder.group({
        email: this.formBuilder.control('', [
            Validators.required,
            Validators.email
        ]),
        password: this.formBuilder.control('', [Validators.required])
    });

    constructor(
        private store: Store<AppState>,
        public formBuilder: FormBuilder,
        private router: Router,
        private _snackBar: MatSnackBar
    ) {
        const subscription = this.signInForm.valueChanges.subscribe(() => {
            if (this.signInStatus === this.failed) {
                this.store.dispatch(signInInitAfterFall());
            }
        });
        this.subscriptions.push(subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes['signInStatus'] &&
            this.signInStatus === StatusState.Success
        ) {
            this.openSnackBar('You were signed in successfully.', 'Close', {
                duration: 3000
            });
        }
        if (
            changes['errorType'] &&
            this.errorType === ErrorType.NotFoundException &&
            this.signInStatus === StatusState.Failed
        ) {
            this.openSnackBar(`Attempt failed. ${this.errorMessage}`, 'Close', {
                duration: 3000
            });
        }
        if (
            changes['errorType'] &&
            this.errorType !== ErrorType.NotFoundException &&
            this.signInStatus === StatusState.Failed
        ) {
            this.openSnackBar('Attempt failed. Check your connection and try again.', 'Close', {
                duration: 3000
            });
        }
    }

    openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
        this._snackBar.open(message, action, config);
    }

    signIn(): void {
        const data = this.signInForm.value;
        this.store.dispatch(signInLoading({ data }));
    }

    get email(): AbstractControl | null {
        return this.signInForm.get('email');
    }

    get password(): AbstractControl | null {
        return this.signInForm.get('password');
    }
}
