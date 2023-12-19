import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { SignUpService } from '../../sign-up/sign-up.service';
import {
    signUpFailed,
    signUpLoading,
    signUpSuccess
} from '../actions/signUp.actions';

@Injectable()
export class SignUpEffects {
    signUpLoading$ = createEffect(() => this.actions$.pipe(
            ofType(signUpLoading),
            mergeMap((action) =>
                this.signUpService.signUp(action.data).pipe(
                    map(() => signUpSuccess()),
                    catchError((error) =>
                        of(
                            signUpFailed({
                                error
                            })
                        )
                    )
                )
            )
        ));

    constructor(
        private actions$: Actions,
        private signUpService: SignUpService
    ) {}
}
