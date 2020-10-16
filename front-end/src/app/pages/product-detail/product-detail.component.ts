import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductQuery, ProductState } from 'service';

@Component({
    selector: 'my-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
    public quantity: number = 1;
    public activeProduct: ProductState;
    public constructor(public productQuery: ProductQuery, public route: ActivatedRoute) {}

    public ngOnInit(): void {
      this.route.paramMap.subscribe(param => {
        const id = param.get('id');
        this.productQuery.selectEntity(id).subscribe(product => {
          this.activeProduct = product;
        });
      });
    }

    public onQuantityChange(count: number): void {
      this.quantity += count;
    }
}
