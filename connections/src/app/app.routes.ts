import { Routes } from '@angular/router';

import { MainPageComponent } from './main-page/main-page/main-page.component';
import { ProfilePageContainerComponent } from './profile/profile-page-container/profile-page-container.component';
import { authGuard } from './sign-in/sign-in.guard';
import { SignInPageContainerComponent } from './sign-in/sign-in-page-container/sign-in-page-container.component';
import { SignUpPageComponent } from './sign-up/sign-up-page.component';
import { ConversationPageContainerComponent } from './conversation-page/conversation-page-container/conversation-page-container.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'main' },
    { path: 'signin', component: SignInPageContainerComponent },
    { path: 'signup', component: SignUpPageComponent },
    { path: 'main', canActivate: [authGuard], component: MainPageComponent },
    {
        path: 'profile',
        canActivate: [authGuard],
        component: ProfilePageContainerComponent
    },
    {
        path: 'conversation/:id',
        component: ConversationPageContainerComponent,
        canActivate: [authGuard]
    }
];
