import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

import { routes } from './app.routes';
import { SignInEffects } from './redux/effects/signIn.effects';
import { SignUpEffects } from './redux/effects/signUp.effects';
import { signInReducer } from './redux/reducers/signIn.reducer';
import { signUpReducer } from './redux/reducers/signUp.reducer';

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
