import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { selectSignInStatus } from '../../redux/selectors/signIn.selectors';
import { AppState, StatusState } from '../../redux/state.models';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    public signInStatus$: Observable<StatusState>;
    public success = StatusState.Success;
    constructor(
        public store: Store<AppState>,
        private router: Router
    ) {
        this.signInStatus$ = store.select(selectSignInStatus);
    }

    goToProfilePage() {
        this.router.navigate(['/profile']);
    }
}
