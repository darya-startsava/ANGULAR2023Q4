import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function uniqueEmailValidator(takenEmails: Array<string>): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isUnique = !takenEmails.includes(control.value);
        return !isUnique ? { uniqueEmail: { value: control.value } } : null;
    };
}
