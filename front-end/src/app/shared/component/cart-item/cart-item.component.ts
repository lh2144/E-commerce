import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { Product, ProductQuery } from 'service';
import { CartService } from 'src/app/core/service/cart/cart.service';
import { CartItem } from 'src/app/core/service/cart/cartItem.modal';

@Component({
    selector: 'my-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent implements OnInit, OnChanges {
    @Input() public cart: CartItem;
    @Input() public editMode: boolean;
    public product: Product;
    public quantity: number;
    public totalPrice: number;

    public constructor(public productQuery: ProductQuery, public cartService: CartService) {

    }

    public ngOnChanges(change: SimpleChanges): void {
      if (change['cart']) {

      }
    }

    public ngOnInit(): void {
      this.productQuery.selectEntity((state) => {
        return state.productName === this.cart.productName;
      }).pipe(distinctUntilChanged((x, y) => x.productName === y.productName)).subscribe(product => {
        this.product = product;
      });
      this.quantity = this.cart.quantity;
      this.totalPrice = this.quantity * this.cart?.price;
    }

    public onQuantityChange(count: number): void {
      this.quantity += count;
      this.totalPrice = this.quantity * this.cart?.price;

      this.cartService.postCart({totalPrice: this.totalPrice, items: [{...this.cart, quantity: this.quantity}]}).subscribe();
    }

}
