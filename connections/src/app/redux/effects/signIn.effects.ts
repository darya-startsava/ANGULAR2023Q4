import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { SignInService } from '../../sign-in/sign-in.service';
import {
    signInFailed,
    signInLoading,
    signInSuccess
} from '../actions/signIn.actions';

@Injectable()
export class SignInEffects {
    signInLoading$ = createEffect(() => this.actions$.pipe(
            ofType(signInLoading),
            mergeMap((action) =>
                this.signInService.signIn(action.data).pipe(
                    map((response) => {
                        localStorage.setItem('email', action.data.email || '');
                        localStorage.setItem('token', response.token);
                        localStorage.setItem('uid', response.uid);
                        return signInSuccess();
                    }),
                    catchError((error) =>
                        of(
                            signInFailed({
                                error
                            })
                        )
                    )
                )
            )
        ));

    constructor(
        private actions$: Actions,
        private signInService: SignInService
    ) {}
}
