import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../redux/state.models';
import { ProfilePageComponent } from '../profile-page/profile-page.component';

@Component({
    selector: 'app-profile-page-container',
    standalone: true,
    imports: [ProfilePageComponent],
    templateUrl: './profile-page-container.component.html',
    styleUrl: './profile-page-container.component.scss'
})
export class ProfilePageContainerComponent {
    constructor(public store: Store<AppState>) {}
}
