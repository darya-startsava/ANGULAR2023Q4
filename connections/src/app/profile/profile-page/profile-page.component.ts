import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [],
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
    @Input() uid: string | null | undefined;
    @Input() email: string | null | undefined;
    @Input() name: string | null | undefined;
    @Input() createdAt: string | null | undefined;

    get date() {
        if (this.createdAt) {
            return new Date(+this.createdAt).toLocaleString();
        }
        return null;
    }
}
