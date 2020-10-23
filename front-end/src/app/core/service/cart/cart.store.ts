import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Cart } from './cart.model';

@StoreConfig({name: 'Cart'})
@Injectable({providedIn: 'root'})
export class CartStore extends Store<Cart> {
  public constructor() {
    super({
      shippingAddress: undefined,
      totalPrice: undefined,
      contactEmail: undefined,
      items: undefined
    });
  }
}
