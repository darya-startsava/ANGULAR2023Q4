import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SignOutService {
    private readonly signOutUrl = 'https://tasks.app.rs.school/angular/logout';

    constructor(private http: HttpClient) {}

    signOut() {
        const headers = new HttpHeaders()
            .set('rs-uid', localStorage.getItem('uid') || '')
            .set('rs-email', localStorage.getItem('email') || '')
            .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.delete(this.signOutUrl, { headers });
    }
}
