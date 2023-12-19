import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GroupsListResponse } from '../models/group.models';

@Injectable({
    providedIn: 'root'
})
export class GroupService {
    private readonly groupsListUrl =
        'https://tasks.app.rs.school/angular/groups/list';

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
}
