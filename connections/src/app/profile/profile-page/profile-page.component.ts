import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { profileUpdate } from '../../redux/actions/profile.actions';
import { AppState } from '../../redux/state.models';
import { anyLettersNameValidator } from '../../sign-up/directives/any-letters-name.directive';
import { ProfileService } from '../profile.service';

export enum ProfileEditStatus {
    Init = 'Init',
    InProgress = 'InProgress',
    Loading = 'Loading'
}

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [
        MatButtonModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnDestroy {
    @Input() uid: string | null | undefined;
    @Input() email: string | null | undefined;
    @Input() name: string | null | undefined;
    @Input() createdAt: string | null | undefined;
    editStatus: ProfileEditStatus = ProfileEditStatus.Init;
    init = ProfileEditStatus.Init;
    inProgress = ProfileEditStatus.InProgress;
    loading = ProfileEditStatus.Loading;
    subscriptions: Subscription[] = [];
    nameInput = new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
        anyLettersNameValidator()
    ]);

    constructor(
        private profileService: ProfileService,
        private _snackBar: MatSnackBar,
        private store: Store<AppState>
    ) {}

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }

    openSnackBar(message: string, action: string, config: MatSnackBarConfig) {
        this._snackBar.open(message, action, config);
    }

    get date(): string | null {
        if (this.createdAt) {
            return new Date(+this.createdAt).toLocaleString();
        }
        return null;
    }

    onEditProfile(): void {
        this.editStatus = ProfileEditStatus.InProgress;
        this.nameInput.setValue(this.name || '');
    }

    onSaveProfile(): void {
        this.editStatus = ProfileEditStatus.Loading;
        const subscription = this.profileService
            .updateProfile(this.nameInput.value || '')
            .subscribe(
                () => {
                    this.name = this.nameInput.value;
                    this.store.dispatch(
                        profileUpdate({ name: this.name || '' })
                    );
                    this.openSnackBar(
                        'Your name was successfully changed.',
                        'Close',
                        {
                            duration: 3000
                        }
                    );
                    this.editStatus = ProfileEditStatus.Init;
                },
                () => {
                    this.editStatus = ProfileEditStatus.Init;
                    this.openSnackBar(
                        'Attempt failed. Check your connection and try again.',
                        'Close',
                        {
                            duration: 3000
                        }
                    );
                }
            );
        this.subscriptions.push(subscription);
    }

    onCancelEditProfile(): void {
        this.editStatus = ProfileEditStatus.Init;
    }
}
