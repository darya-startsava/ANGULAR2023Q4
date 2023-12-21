import { Component, Input } from '@angular/core';
import { PeopleDataState } from '../../../redux/state.models';
import { RouterModule, Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-people-list-item',
    standalone: true,
    imports: [RouterModule, MatProgressSpinnerModule],
    templateUrl: './people-list-item.component.html',
    styleUrl: './people-list-item.component.scss'
})
export class PeopleListItemComponent {
    @Input() person!: PeopleDataState;
    isLoadingConversationPage = false;

    constructor(private router: Router) {}

    handleLinkClick(): void {
        this.isLoadingConversationPage = true;
        setTimeout(() => {
            this.router.navigate(['/conversation', this.person.conversationId]);
        }, 3000);
    }
}
