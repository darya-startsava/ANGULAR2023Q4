import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { PeopleResponse } from '../../main-page/models/people.models';
import { PeopleService } from '../../main-page/services/people.service';
import {
    peopleFailed,
    peopleLoading,
    peopleSuccess
} from '../actions/people.actions';
import { PeopleDataState } from '../state.models';

@Injectable()
export class PeopleEffects {
    peopleLoading$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleLoading),
            mergeMap(() =>
                this.peopleService.getPeople().pipe(
                    map((data: PeopleResponse) => {
                        const peopleData: PeopleDataState[] = data.Items.map(
                            (item) => ({
                                name: item.name.S,
                                uid: item.uid.S
                            })
                        );
                        return peopleSuccess({
                            data: peopleData
                        });
                    }),
                    catchError((error) => of(peopleFailed({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private peopleService: PeopleService
    ) {}
}
