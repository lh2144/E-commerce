import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CartService } from './core/service/cart/cart.service';
import { UserQuery } from './core/service/customer/customer.query';
import { CustomerService } from './core/service/customer/customer.service';
import { UserState } from './core/service/customer/user.model';
import { ProductService } from './core/service/product';
import { StateService } from './shared/service/state.service';

@Component({
    selector: 'my-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public currentUser: Observable<UserState> = this.userQuery.allState$;

    public constructor(
        public customerService: CustomerService,
        public userQuery: UserQuery,
        public productService: ProductService,
        public stateService: StateService,
        public cartService: CartService
    ) {}

    public ngOnInit(): void {
        if (localStorage.getItem('sessionToken')) {
            this.customerService.login({}).subscribe(
                (_) => {},
                (err) => {
                    localStorage.removeItem('sessionToken');
                }
            );
        }
        // this.currentUser
        //     .pipe(distinctUntilChanged((x, y) => x.name === y.name))
        //     .subscribe((user) => {
        //         if (user.name) {
        //             this.cartService.getCart().subscribe();
        //         }
        //     });
        if (this.cartService.cart?.items?.length > 0) {
          this.cartService.getCart().subscribe();
        }
        this.productService.getAllProduct().subscribe();
    }

    @HostListener('click', ['$event'])
    public collapseDropDown(e: Event): void {
        if (!(e.target as HTMLElement).closest('.dropbtn')) {
            this.stateService.toggleBackDrop();
        }
    }
}
