import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function onlyLettersDigitsSpacesNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg = /^[A-Za-z0-9 ]*$/;
        const isLetterDigitName = reg.test(control.value.trim());
        return !isLetterDigitName ? { letterDigitName: { value: control.value } } : null;
    };
}
