import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductQuery, ProductState } from 'service';

@Component({
    selector: 'my-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    public quantity: number = 1;
    public activeProduct: Product;
    public currentRate: number = 2.5;
    public comments: Comment[];
    public productId: string;
    public constructor(public productQuery: ProductQuery, public route: ActivatedRoute) {}

    public ngOnInit(): void {
      this.route.paramMap.subscribe(param => {
        this.productId = param.get('id');
        this.productQuery.selectEntity(this.productId).subscribe((product: Product) => {
          this.activeProduct = product;
          this.comments = this.activeProduct?.reviews;
        });
      });
    }

    public onQuantityChange(count: number): void {
      this.quantity += count;
    }
}
