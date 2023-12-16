import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { signUpReducer } from './redux/reducers/signUp.reducer';
import { provideEffects } from '@ngrx/effects';
import { SignUpEffects } from './redux/effects/signUp.effects';
import { SignInEffects } from './redux/effects/signIn.effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { signInReducer } from './redux/reducers/signIn.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(HttpClientModule),
        provideStore(),
        provideState({ name: 'signUp', reducer: signUpReducer }),
        provideState({ name: 'signIn', reducer: signInReducer }),
        provideEffects(SignUpEffects, SignInEffects),
        provideAnimations()
    ]
};
