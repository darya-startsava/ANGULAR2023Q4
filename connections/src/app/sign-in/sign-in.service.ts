import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SignInDataState } from '../redux/state.models';
import { SignInResponse } from './sign-in.models';

@Injectable({
    providedIn: 'root'
})
export class SignInService {
    private readonly signInUrl = ' https://tasks.app.rs.school/angular/login';

    constructor(private http: HttpClient) {}

    signIn(data: SignInDataState): Observable<SignInResponse> {
        return this.http.post<SignInResponse>(this.signInUrl, data);
    }
}
