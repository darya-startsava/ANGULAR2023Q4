import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CheckIsSignedInService {
    get isToken(): string | null {
        return localStorage.getItem('token');
    }
}
