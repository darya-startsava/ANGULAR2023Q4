import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { CheckIsSignedInService } from '../check-is-signed-in.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    constructor(
        private router: Router,
        public checkIsSignedInService: CheckIsSignedInService
    ) {}

    goToProfilePage() {
        this.router.navigate(['/profile']);
    }
}
