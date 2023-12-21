import { Component } from '@angular/core';
import { GroupPageComponent } from '../group-page/group-page.component';

@Component({
  selector: 'app-group-page-container',
  standalone: true,
  imports: [GroupPageComponent],
  templateUrl: './group-page-container.component.html',
  styleUrl: './group-page-container.component.scss'
})
export class GroupPageContainerComponent {

}
