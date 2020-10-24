import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/core/service/cart/cartItem.modal';

@Component({
    selector: 'my-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
    @Input() public cart: CartItem;
    @Input() public editMode: boolean = false;
    public  quantity: number;

    public constructor() {}

    public ngOnInit(): void {}

    public onQuantityChange(count: number): void {
      this.quantity += count;
    }

}
