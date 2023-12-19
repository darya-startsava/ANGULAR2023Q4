import { Component, Input } from '@angular/core';

import { GroupsDataState } from '../../../redux/state.models';

@Component({
    selector: 'app-group-list-item',
    standalone: true,
    imports: [],
    templateUrl: './group-list-item.component.html',
    styleUrl: './group-list-item.component.scss'
})
export class GroupListItemComponent {
    @Input() group!: GroupsDataState;
}
