import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectSignInErrorMessage, selectSignInErrorType, selectSignInStatus } from '../../redux/selectors/signIn.selectors';
import { AppState, ErrorType, StatusState } from '../../redux/state.models';
import { SignInPageComponent } from '../sign-in-page/sign-in-page.component';

@Component({
    selector: 'app-sign-in-page-container',
    standalone: true,
    imports: [CommonModule, SignInPageComponent],
    templateUrl: './sign-in-page-container.component.html',
    styleUrl: './sign-in-page-container.component.scss'
})
export class SignInPageContainerComponent {
    public signInStatus$: Observable<StatusState>;
    public errorMessage$: Observable<string>;
    public errorType$: Observable<ErrorType | null>;
    constructor(public store: Store<AppState>) {
        this.signInStatus$ = store.select(selectSignInStatus);
        this.errorMessage$ = store.select(selectSignInErrorMessage);
        this.errorType$ = store.select(selectSignInErrorType);
    }
}
