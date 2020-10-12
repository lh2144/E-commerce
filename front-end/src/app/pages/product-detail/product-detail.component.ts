import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    public quantity: number = 1;
    public constructor() {}

    public ngOnInit(): void {}

    public onQuantityChange(count: number): void {
      this.quantity += count;
    }
}
