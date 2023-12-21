import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, forkJoin, map, mergeMap, of } from 'rxjs';

import {
    ConversationsListResponse,
    CreateConversationResponse
} from '../../main-page/models/conversations.models';
import { PeopleResponse } from '../../main-page/models/people.models';
import { ConversationsService } from '../../main-page/services/conversations.service';
import { PeopleService } from '../../main-page/services/people.service';
import {
    createConversationFailed,
    createConversationLoading,
    createConversationSuccess,
    peopleFailed,
    peopleLoading,
    peopleSuccess
} from '../actions/people.actions';

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
                            conversationID: null
                        })).map((item) => {
                            if (mapConversations.has(item.uid)) {
                                return {
                                    ...item,
                                    conversationID: mapConversations.get(
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

    createConversationLoading$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createConversationLoading),
            mergeMap((action) =>
                this.conversationsService
                    .createConversation(action.companionID)
                    .pipe(
                        map((data: CreateConversationResponse) =>
                            createConversationSuccess({
                                companionID: action.companionID,
                                conversationID: data.conversationID
                            })
                        ),
                        catchError((error) =>
                            of(createConversationFailed({ error }))
                        )
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private peopleService: PeopleService,
        private conversationsService: ConversationsService
    ) {}
}
