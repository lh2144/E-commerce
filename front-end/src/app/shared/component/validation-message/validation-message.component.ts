import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidationService } from '../../service/FormValidation.service';

@Component({
    selector: 'my-validation',
    templateUrl: './validation-message.component.html',
    styleUrls: ['./validation-message.component.scss'],
})
export class ValidationMessageComponent implements OnInit {
    @Input() public control: FormControl;
    @Input() public divclass: string;

    public constructor() { }

    public ngOnInit(): void { }

    get ErrorMessage(): string {
        for (const key in this.control.errors) {
            if (this.control.errors.hasOwnProperty(key)) {
                return FormValidationService.getErrors(key, this.control.errors);
            }
        }
    }
}
