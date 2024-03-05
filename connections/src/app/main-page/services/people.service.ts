import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PeopleResponse } from '../models/people.models';

@Injectable({
    providedIn: 'root'
})
export class PeopleService {
    getConversations() {
      throw new Error('Method not implemented.');
    }
    private readonly peopleUrl = ' https://tasks.app.rs.school/angular/users';

    constructor(private http: HttpClient) {}

    getPeople(): Observable<PeopleResponse> {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

        return this.http.get<PeopleResponse>(this.peopleUrl, {
            headers
        });
    }
}
