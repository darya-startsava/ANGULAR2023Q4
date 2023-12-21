import { Component, Input } from '@angular/core';
import { PeopleDataState } from '../../../redux/state.models';

@Component({
    selector: 'app-people-list-item',
    standalone: true,
    imports: [],
    templateUrl: './people-list-item.component.html',
    styleUrl: './people-list-item.component.scss'
})
export class PeopleListItemComponent {
    @Input() person!: PeopleDataState;
}
