import { Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in/sign-in-page.component';
import { SignUpPageComponent } from './sign-up/sign-up-page.component';

export const routes: Routes = [
    { path: 'signin', component: SignInPageComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: '', pathMatch: 'full', redirectTo: 'signin' }
];
