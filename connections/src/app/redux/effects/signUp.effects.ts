import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignUpService } from '../../sign-up/sign-up.service';
import {
    signUpFailed,
    signUpLoading,
    signUpSuccess
} from '../actions/signUp.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SignUpEffects {
    signUpLoading$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(signUpLoading),
            mergeMap((action) =>
                this.signUpService.signUp(action.data).pipe(
                    map(() => {
                        return signUpSuccess();
                    }),
                    catchError((error) =>
                        of(
                            signUpFailed({
                                error
                            })
                        )
                    )
                )
            )
        );
    });

    constructor(
        private actions$: Actions,
        private signUpService: SignUpService
    ) {}
}
