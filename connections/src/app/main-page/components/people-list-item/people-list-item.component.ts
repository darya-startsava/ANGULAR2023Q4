import { Component, Input } from '@angular/core';
import { PeopleDataState } from '../../../redux/state.models';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-people-list-item',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './people-list-item.component.html',
    styleUrl: './people-list-item.component.scss'
})
export class PeopleListItemComponent {
    @Input() person!: PeopleDataState;

    constructor(private router: Router) {}

    handleLinkClick(): void {
        setTimeout(() => {
            this.router.navigate(['/conversation', this.person.conversationId]);
        }, 3000);
    }
}
