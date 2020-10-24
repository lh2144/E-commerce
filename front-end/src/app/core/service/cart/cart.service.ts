import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart } from './cart.model';
import { CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class CartService {
    public constructor(public cartStore: CartStore, public http: HttpClient) {}

    public getCart(): Observable<Cart> {
        return this.http.get(environment.base + 'buyflow/cart').pipe(
            map((res) => {
                this.cartStore.update(res);
                return res as Cart;
            })
        );
    }

    public postCart(payload: any): Observable<Cart> {
        return this.http.post(environment.base + 'buyflow/cart', payload).pipe(
            map((res) => {
                this.cartStore.update(res);
                return res as Cart;
            })
        );
    }

    public construcePayload(payload: Partial<Cart>): any {
      let cart;
      cart = {...payload};
      return cart;
    }
}
