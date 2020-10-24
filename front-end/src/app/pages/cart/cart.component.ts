import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartQuery } from 'src/app/core/service/cart/cart.query';

@Component({
    selector: 'my-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    public cartItems = this.cartQuery.cartItems$;
    public totalPrice: Observable<number> = this.cartQuery.select('totalPrice');
    public constructor(public cartQuery: CartQuery) {}

    public ngOnInit(): void {}
}
