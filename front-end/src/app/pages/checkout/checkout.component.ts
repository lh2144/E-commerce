import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
    public activeDelivery;
    public constructor() {}

    public ngOnInit(): void {}
}
