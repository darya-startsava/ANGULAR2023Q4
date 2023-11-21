import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg =
            /^(?=.*\d)(?=.*[!@#$%^&*\]?}{()])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        const isStrong = reg.test(control.value);
        return !isStrong ? { weakPassword: { value: control.value } } : null;
    };
}
