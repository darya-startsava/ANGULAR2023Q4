import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function anyLettersNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg = /^[\p{L}\p{M}\p{Zs}]{1,40}$/u;
        const isLetterName = reg.test(control.value.trim());
        return !isLetterName ? { letterName: { value: control.value } } : null;
    };
}
