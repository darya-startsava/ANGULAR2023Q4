import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileResponse } from './profile.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private uid = localStorage.getItem('uid') || '';
    private email = localStorage.getItem('email') || '';
    private token = `Bearer ${localStorage.getItem('token')}`;

    private readonly signUpUrl = 'https://tasks.app.rs.school/angular/profile';

    constructor(private http: HttpClient) {}

    getProfile(): Observable<ProfileResponse> {
        const headers = new HttpHeaders()
            .set('rs-uid', this.uid)
            .set('rs-email', this.email)
            .set('Authorization', this.token);

        return this.http.get<ProfileResponse>(this.signUpUrl, { headers });
    }

    updateProfile(name: string) {
        const headers = new HttpHeaders()
            .set('rs-uid', this.uid)
            .set('rs-email', this.email)
            .set('Authorization', this.token);

        return this.http.put(this.signUpUrl, { name }, { headers });
    }
}
