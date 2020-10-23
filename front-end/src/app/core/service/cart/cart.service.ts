import { Injectable } from '@angular/core';
import { CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {
    public constructor(public cartStore: CartStore) {}
}
