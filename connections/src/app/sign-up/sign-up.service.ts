import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SignUpDataState } from '../redux/state.models';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {
    private readonly signUpUrl =
        ' https://tasks.app.rs.school/angular/registration';

    constructor(private http: HttpClient) {}

    signUp(data: SignUpDataState) {
        return this.http.post(this.signUpUrl, data);
    }
}
