import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { Cart } from './cart.model';
import { CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartQuery extends Query<Cart> {
    public cartItems$ = this.select('items');
    public cart: Cart = this.getValue();
    public constructor(protected store: CartStore) {
        super(store);
    }
}
