import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileResponse } from './profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly signUpUrl = 'https://tasks.app.rs.school/angular/profile';

    constructor(private http: HttpClient) {}

    getProfile(): Observable<ProfileResponse> {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

        return this.http.get<ProfileResponse>(this.signUpUrl, { headers });
    }

    updateProfile(name: string) {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
            .set('Content-Type', 'application/json');
        return this.http.put(this.signUpUrl, { name }, { headers });
    }
}
