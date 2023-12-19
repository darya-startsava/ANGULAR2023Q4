import { Component } from '@angular/core';

import { GroupSectionContainerComponent } from '../components/group-section-container/group-section-container.component';
import { PeopleSectionContainerComponent } from '../components/people-section-container/people-section-container.component';

@Component({
    selector: 'app-main-page',
    standalone: true,
    imports: [GroupSectionContainerComponent, PeopleSectionContainerComponent],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.scss'
})
export class MainPageComponent {}
