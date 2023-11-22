import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function dateBeforeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isDateBefore = new Date(control.value).getTime() <= Date.now();
        return !isDateBefore ? { dateBefore: { value: control.value } } : null;
    };
}
