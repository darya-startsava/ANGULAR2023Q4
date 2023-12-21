import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { createConversationLoading } from '../../../redux/actions/people.actions';
import { selectCreateConversationStatus } from '../../../redux/selectors/people.selectors';
import {
    AppState,
    PeopleDataState,
    StatusState
} from '../../../redux/state.models';
import { ColoredBackgroundDirective } from '../../directives/colored-background.directive';

@Component({
    selector: 'app-people-list-item',
    standalone: true,
    imports: [
        RouterModule,
        MatProgressSpinnerModule,
        ColoredBackgroundDirective
    ],
    templateUrl: './people-list-item.component.html',
    styleUrl: './people-list-item.component.scss'
})
export class PeopleListItemComponent {
    @Input() person!: PeopleDataState;
    isLoadingConversationPage = false;

    constructor(
        private router: Router,
        public store: Store<AppState>
    ) {}

    handleLinkClick(): void {
        if (this.person.conversationID) {
            this.router.navigate(['/conversation', this.person.conversationID]);
            return;
        }
        this.isLoadingConversationPage = true;
        this.store.dispatch(
            createConversationLoading({ companionID: this.person.uid })
        );
        this.store
            .select(selectCreateConversationStatus)
            .subscribe((status) => {
                if (status === StatusState.Success) {
                    setTimeout(() => {
                        this.router.navigate([
                            '/conversation',
                            this.person.conversationID
                        ]);
                    }, 2000);
                } else if (status === StatusState.Failed) {
                    this.isLoadingConversationPage = false;
                }
            });
    }
}
