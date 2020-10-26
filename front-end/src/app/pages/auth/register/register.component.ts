import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { CustomerService } from 'service';
import { FormValidationService } from 'src/app/shared/service/FormValidation.service';

@Component({
    selector: 'my-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    public inputType: string = 'password';
    public showPassword: boolean;
    public constructor(
        public fb: FormBuilder,
        public customerService: CustomerService
    ) {}

    public ngOnInit(): void {
        this.registerForm = this.fb.group({
            name: [null, [Validators.required]],
            email: [null, Validators.required],
            cEmail: [null, [Validators.required]],
            password: [null, [Validators.required, Validators.minLength(6)]],
            cPassword: [null, [Validators.required, Validators.minLength(6)]],
            phone: [null, Validators.required],
        });
    }

    get controls(): { [key: string]: AbstractControl } {
        return this.registerForm.controls;
    }

    public validForm(): boolean {
        let valid: boolean;
        let errorMessage = FormValidationService.isMatch(this.controls.email, 'email')(this.controls.cEmail);
        if (errorMessage) {
          this.controls.cEmail.setErrors(errorMessage);
          valid = !!errorMessage;
        }
        errorMessage = FormValidationService.isMatch(this.controls.password, 'password')(this.controls.cPassword);
        if (errorMessage) {
          this.controls.cPassword.setErrors(errorMessage);
          valid = valid && !!errorMessage;
        }
        this.registerForm.updateValueAndValidity();
        return valid;
    }

    public register(): void {
        if (this.validForm()) {
          const payload = {};
          payload['name'] = this.controls['name'].value;
          payload['email'] = this.controls['email'].value;
          payload['password'] = this.controls['password'].value;
          payload['phone'] = this.controls['phone'].value;
          this.customerService.register(payload).subscribe();
        }
    }
}
