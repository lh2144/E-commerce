import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, Comment, ProductQuery, ProductState } from 'service';
import { CartService } from 'src/app/core/service/cart/cart.service';

@Component({
    selector: 'my-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    public quantity: number = 1;
    public activeProduct: Product;
    public currentRate: number = 0;
    public comments: Comment[];
    public productId: string;
    public starWMap: any = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    };
    public max: number = 0;
    public total: number = 0;
    public constructor(
        public productQuery: ProductQuery,
        public route: ActivatedRoute,
        public router: Router,
        public cartService: CartService,
    ) {}

    public ngOnInit(): void {
        this.route.paramMap.subscribe((param) => {
            this.productId = param.get('id');
            this.productQuery
                .selectEntity(this.productId)
                .subscribe((product: Product) => {
                    this.activeProduct = product;
                    this.comments = this.activeProduct?.reviews;
                    this.comments?.forEach((review: Comment) => {
                        this.total++;
                        this.currentRate += +review.rating;
                        this.starWMap[review.rating]++;
                    });
                    for (const index in this.starWMap) {
                        if (this.max < this.starWMap[index]) {
                            this.max = this.starWMap[index];
                        }
                    }
                    this.currentRate = this.currentRate / this.comments?.length;
                });
        });
    }

    public onQuantityChange(count: number): void {
        this.quantity += count;
    }

    public createComment(): void {
        this.router.navigate(['postComment', this.productId]);
    }

    public addItemToCart(): void {
      const cartData = {id: null, price: this.activeProduct.price, quantity: this.quantity, productName: this.activeProduct.productName};
      const payload = this.cartService.constructPayload(cartData);
      this.cartService.postCart(payload).subscribe();
    }

    public goCheckOut(): void {
      this.router.navigateByUrl('/checkout');
    }
}
