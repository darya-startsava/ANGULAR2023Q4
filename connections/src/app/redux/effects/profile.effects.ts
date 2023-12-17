import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ProfileResponse } from '../../profile/profile.model';
import { ProfileService } from '../../profile/profile.service';
import {
    profileFailed,
    profileLoading,
    profileSuccess
} from '../actions/profile.actions';
import { ProfileDataState } from '../state.models';

@Injectable()
export class ProfileEffects {
    profileLoading$ = createEffect(() =>
        this.actions$.pipe(
            ofType(profileLoading),
            mergeMap(() =>
                this.profileService.getProfile().pipe(
                    map((data: ProfileResponse) => {
                        const profileData: ProfileDataState = {
                            email: data.email.S,
                            name: data.name.S,
                            uid: data.uid.S,
                            createdAt: data.createdAt.S
                        };
                        return profileSuccess({
                            data: profileData
                        });
                    }),
                    catchError((error) => of(profileFailed({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private profileService: ProfileService
    ) {}
}
