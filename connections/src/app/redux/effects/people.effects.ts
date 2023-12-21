import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, mergeMap, of } from 'rxjs';

import { PeopleResponse } from '../../main-page/models/people.models';
import { PeopleService } from '../../main-page/services/people.service';
import {
    peopleFailed,
    peopleLoading,
    peopleSuccess
} from '../actions/people.actions';
import { ConversationsService } from '../../main-page/services/conversations.service';
import { ConversationsListResponse } from '../../main-page/models/conversations.models';

@Injectable()
export class PeopleEffects {
    peopleLoading$ = createEffect(() =>
        this.actions$.pipe(
            ofType(peopleLoading),
            mergeMap(() => {
                const peopleRequest = this.peopleService.getPeople();
                const conversationsRequest =
                    this.conversationsService.getConversations();

                return forkJoin([peopleRequest, conversationsRequest]).pipe(
                    map(([peopleData, conversationsData]) => {
                        const transformedConversationsData = (
                            conversationsData as ConversationsListResponse
                        ).Items.map((item) => ({
                            id: item.id.S,
                            companionID: item.companionID.S
                        }));
                        const mapConversations = new Map();
                        transformedConversationsData.forEach((item) => {
                            mapConversations.set(item.companionID, item.id);
                        });
                        const transformedPeopleData = (
                            peopleData as PeopleResponse
                        ).Items.map((item) => ({
                            name: item.name.S,
                            uid: item.uid.S,
                            conversationId: 'null'
                        })).map((item) => {
                            if (mapConversations.has(item.uid)) {
                                return {
                                    ...item,
                                    conversationId: mapConversations.get(
                                        item.uid
                                    )
                                };
                            }
                            return item;
                        });

                        return peopleSuccess({
                            data: transformedPeopleData
                        });
                    }),
                    catchError((error) => of(peopleFailed({ error })))
                );
            })
        )
    );
    constructor(
        private actions$: Actions,
        private peopleService: PeopleService,
        private conversationsService: ConversationsService
    ) {}
}
