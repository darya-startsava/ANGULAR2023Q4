import { Component } from '@angular/core';
import { ConversationPageComponent } from '../conversaton-page/conversation-page.component';

@Component({
    selector: 'app-conversation-page-container',
    standalone: true,
    imports: [ConversationPageComponent],
    templateUrl: './conversation-page-container.component.html',
    styleUrl: './conversation-page-container.component.scss'
})
export class ConversationPageContainerComponent {}
