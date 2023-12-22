import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    CreateGroupResponse,
    GroupMessagesResponse,
    GroupsListResponse
} from '../models/group.models';

function buildParams(params: Record<string, string>): HttpParams {
    return new HttpParams({ fromObject: params });
}

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    private readonly groupsListUrl =
        'https://tasks.app.rs.school/angular/groups/list';
    private readonly createGroupUrl =
        'https://tasks.app.rs.school/angular/groups/create';
    private readonly deleteGroupUrl =
        'https://tasks.app.rs.school/angular/groups/delete?groupID=';

    private readonly getMessagesUrl =
        'https://tasks.app.rs.school/angular/groups/read?';

    constructor(private http: HttpClient) {}
    getGroupsList(): Observable<GroupsListResponse> {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

        return this.http.get<GroupsListResponse>(this.groupsListUrl, {
            headers
        });
    }
    createGroup(name: string): Observable<CreateGroupResponse> {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            .set('Content-Type', 'application/json');

        return this.http.post<CreateGroupResponse>(
            this.createGroupUrl,
            { name },
            {
                headers
            }
        );
    }

    deleteGroup(id: string) {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.delete(this.deleteGroupUrl + id, { headers });
    }

    getMessages(
        groupID: string,
        since: string
    ): Observable<GroupMessagesResponse> {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

        const params = buildParams({
            groupID,
            since
        });
        return this.http.get<GroupMessagesResponse>(this.getMessagesUrl, {
            headers,
            params
        });
    }
}
