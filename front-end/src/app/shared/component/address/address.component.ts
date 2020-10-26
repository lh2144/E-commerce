import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'my-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
    @Input() public editmode = false;
    @Input() public addressType: string = 'shipping';
    public defaultShipping;
    public addresses = [
        'Hang lian 12425 WHISPER HOLLOW DR APT J, MARYLAND HEIGHTS, MO, 63043-3698 United States Edit address',
        'Hang lian 12425 WHISPER HOLLOW DR APT J, MARYLAND HEIGHTS, MO, 63043-3698 United States Edit address'
    ];
    public active;
    public shippingForm: FormGroup;
    public constructor(public fb: FormBuilder) {}

    public ngOnInit(): void {
      this.shippingForm = this.fb.group({
        fullName: [''],
        address1: [''],
        address2: [''],
        city: [''],
        state: [''],
        country: [''],
        zip: [''],
        phone: ['']
      });
    }

    public changeEditMode(): void {
      this.editmode = !this.editmode;
    }
}
