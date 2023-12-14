import { Component } from '@angular/core';
import {
    FormBuilder,
    ReactiveFormsModule,
    Validators,
    AbstractControl
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { signUpLoading } from '../redux/actions/signUp.actions';
import { anyLettersNameValidator } from './directives/any-letters-name.directive';
import { strongPasswordValidator } from './directives/strong-password.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-sign-up-page',
    standalone: true,
    imports: [
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
    ],
    templateUrl: './sign-up-page.component.html',
    styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent {
    hide = true;
    signUpForm = this.formBuilder.group({
        name: this.formBuilder.control('', [
            Validators.required,
            Validators.maxLength(40),
            anyLettersNameValidator()
        ]),
        email: this.formBuilder.control('', [
            Validators.required,
            Validators.email
        ]),
        password: this.formBuilder.control('', [
            Validators.required,
            strongPasswordValidator()
        ])
    });
    constructor(
        private store: Store,
        public formBuilder: FormBuilder
    ) {}
    signUp() {
        const data = this.signUpForm.value;
        this.store.dispatch(signUpLoading({ data }));
    }

    get name(): AbstractControl | null {
        return this.signUpForm.get('name');
    }

    get email(): AbstractControl | null {
        return this.signUpForm.get('email');
    }

    get password(): AbstractControl | null {
        return this.signUpForm.get('password');
    }
}
