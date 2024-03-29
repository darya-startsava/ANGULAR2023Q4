import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    ConversationsListResponse,
    CreateConversationResponse
} from '../models/conversations.models';

@Injectable({
    providedIn: 'root'
})
export class ConversationsService {
    private readonly conversationsListUrl =
        'https://tasks.app.rs.school/angular/conversations/list';
    private readonly createConversationUrl =
        'https://tasks.app.rs.school/angular/conversations/create';
    constructor(private http: HttpClient) {}
    getConversations(): Observable<ConversationsListResponse> {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

        return this.http.get<ConversationsListResponse>(
            this.conversationsListUrl,
            {
                headers
            }
        );
    }

    createConversation(
        companionID: string
    ): Observable<CreateConversationResponse> {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            .set('Content-Type', 'application/json');

        return this.http.post<CreateConversationResponse>(
            this.createConversationUrl,
            { companion: companionID },
            {
                headers
            }
        );
    }
}
