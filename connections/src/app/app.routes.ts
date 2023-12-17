import { Routes } from '@angular/router';

import { ProfilePageContainerComponent } from './profile/profile-page-container/profile-page-container.component';
import { SignInPageContainerComponent } from './sign-in/sign-in-page-container/sign-in-page-container.component';
import { SignUpPageComponent } from './sign-up/sign-up-page.component';

export const routes: Routes = [
    { path: 'signin', component: SignInPageContainerComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: '', pathMatch: 'full', redirectTo: 'signin' },
    { path: 'profile', component: ProfilePageContainerComponent }
];
