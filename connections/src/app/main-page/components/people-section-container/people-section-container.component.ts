import { Component } from '@angular/core';

import { PeopleSectionComponent } from '../people-section/people-section.component';

@Component({
  selector: 'app-people-section-container',
  standalone: true,
  imports: [PeopleSectionComponent],
  templateUrl: './people-section-container.component.html',
  styleUrl: './people-section-container.component.scss'
})
export class PeopleSectionContainerComponent {

}
