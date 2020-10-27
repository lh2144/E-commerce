import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart } from './cart.model';
import { CartQuery } from './cart.query';
import { CartStore } from './cart.store';
import { CartItem } from './cartItem.modal';

@Injectable({ providedIn: 'root' })
export class CartService {
    public cart: Cart = this.cartQuery.cart;
    public constructor(public cartStore: CartStore, public http: HttpClient, public cartQuery: CartQuery) {}

    public getCart(): Observable<Cart> {
        return this.http.get(environment.base + 'buyflow/cart').pipe(
            map((res) => {
                this.cartStore.update(res);
                return res as Cart;
            })
        );
    }

    public postCart(payload: Cart): Observable<Cart> {
        return this.http.post(environment.base + 'buyflow/cart', payload).pipe(
            map((res: {[key: string]: any}) => {
                if (res.session_id) {
                  if (!localStorage.getItem('sessionId')) {
                    localStorage.setItem('sessionId', res.session_id);
                  }
                }
                this.cartStore.update(res);
                this.cart = this.cartQuery.getValue();
                return res as Cart;
            })
        );
    }

    public syncCart(): Observable<Cart> {
      return this.http.get<Cart>(environment.base + 'buyflow/syncCart');
    }

    public constructPayload(payload: CartItem): Cart {
      let totalPrice = 0;
      const cartItems = [];
      cartItems.push(payload);
      this.cart.items.forEach((item) => {
        if (item.productName === payload.productName) {
          payload.quantity += item.quantity;
          totalPrice += (item.quantity * item.price);
        } else {
          totalPrice += (item.quantity * item.price);
          cartItems.push(item);
        }
      });
      return {id: null, items: cartItems, totalPrice};
    }
}
