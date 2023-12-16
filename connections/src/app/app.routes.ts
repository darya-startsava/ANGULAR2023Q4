import { Routes } from '@angular/router';

import { SignInPageContainerComponent } from './sign-in/sign-in-page-container/sign-in-page-container.component';
import { SignUpPageComponent } from './sign-up/sign-up-page.component';

export const routes: Routes = [
    { path: 'signin', component: SignInPageContainerComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: '', pathMatch: 'full', redirectTo: 'signin' }
];
