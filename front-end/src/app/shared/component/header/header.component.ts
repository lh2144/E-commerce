import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomerService } from 'service';
import { CartQuery } from 'src/app/core/service/cart/cart.query';
import { CartItem } from 'src/app/core/service/cart/cartItem.modal';
import { UserQuery } from 'src/app/core/service/customer/customer.query';
import { UserStore } from 'src/app/core/service/customer/customer.store';
import { StateService } from '../../service/state.service';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    public cartItems: Observable<CartItem[]>;
    public itemQuantity: number = 0;
    public totalPrice: number = 0;
    public searchControl: FormControl;
    public showDropDown: BackDrop = {
        cart: false,
        account: false,
    };
    public constructor(
        public customerService: CustomerService,
        public userQuery: UserQuery,
        public userStore: UserStore,
        public stateService: StateService,
        public cartQuery: CartQuery
    ) {
        this.stateService.dropDownBdrop$.subscribe((state: BackDrop) => {
            this.showDropDown['cart'] = state['cart'];
            this.showDropDown['account'] = state['account'];
        });
        this.cartItems = this.cartQuery.cartItems$;
        this.cartItems.subscribe((items) => {
            if (items && items.length > 0) {
                this.itemQuantity = 0;
                items.forEach((val) => {
                    this.itemQuantity += val.quantity;
                });
            }
        });
    }

    public ngOnInit(): void {
        this.searchControl = new FormControl('test', []);
        this.cartQuery.select('totalPrice').subscribe(price => {
          if (price) {
            this.totalPrice = price;
          }
        });
    }

    public logout(): void {}

    public ondropDownClick(e: Event, type: string): void {
        this.showDropDown[type] = true;
        if ((e.target as HTMLElement).closest('.drop-content')) {
            this.showDropDown[type] = false;
        }
    }
}
