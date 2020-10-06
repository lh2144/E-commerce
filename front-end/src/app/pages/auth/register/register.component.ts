import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'my-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;

    public constructor(public fb: FormBuilder) {}

    public ngOnInit(): void {
        this.registerForm = this.fb.group({
            name: [null, [Validators.required]],
            email: [null, Validators.required],
            cEmail: [null, Validators.required],
            password: [null, Validators.required],
            cPassword: [null, Validators.required],
            phone: [null, Validators.required],
        });
    }
}
