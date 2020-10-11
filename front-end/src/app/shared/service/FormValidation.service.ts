import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormValidationService {
    constructor() {}

    public static getErrors(prop: string, errors: any): string {
        const ErrorMessage = {
            required: 'Requried',
            noMatch: errors['noMatch'],
            minlength: `the least length should be ${errors['requiredLength']}`
        };
        return ErrorMessage[prop];
    }

    public static isMatch(target: AbstractControl, name: string): any {
        return (control: AbstractControl) => {
            if (target.value !== control.value) {
                if (name === 'email') {
                    return {
                        noMatch: `sorry the ${name} address must match`,
                    };
                }

                if (name === 'password') {
                  return {
                    noMatch: `sorry the two ${name} password you have enter do not much`
                  };
                }
            }
            return null;
        };
    }
}
