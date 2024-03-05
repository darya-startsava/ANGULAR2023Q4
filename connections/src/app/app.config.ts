import { HttpClientModule } from '@angular/common/http';
import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { GroupsEffects } from './redux/effects/groups.effects';
import { PeopleEffects } from './redux/effects/people.effects';
import { ProfileEffects } from './redux/effects/profile.effects';
import { SignInEffects } from './redux/effects/signIn.effects';
import { SignUpEffects } from './redux/effects/signUp.effects';
import { groupsReducer } from './redux/reducers/groups.reducer';
import { peopleReducer } from './redux/reducers/people.reducer';
import { profileReducer } from './redux/reducers/profile.reducer';
import { signInReducer } from './redux/reducers/signIn.reducer';
import { signUpReducer } from './redux/reducers/signUp.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule),
        provideStore(),
        provideState({ name: 'signUp', reducer: signUpReducer }),
        provideState({ name: 'signIn', reducer: signInReducer }),
        provideState({ name: 'profile', reducer: profileReducer }),
        provideState({ name: 'groups', reducer: groupsReducer }),
        provideState({ name: 'people', reducer: peopleReducer }),
        provideEffects(
            SignUpEffects,
            SignInEffects,
            ProfileEffects,
            GroupsEffects,
            PeopleEffects
        ),
        provideAnimations(),
        provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
    ]
};
