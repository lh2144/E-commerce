import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductQuery, ProductService, ProductState } from 'service';

@Component({
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public allProducts = this.productQuery.allProducts$;
    public constructor(
        public productService: ProductService,
        public productQuery: ProductQuery,
        public router: Router
    ) {}

    public ngOnInit(): void {
    }

    public goToDetail(product: ProductState): void {
      this.router.navigate([`${product.id}`, 'product-detail']);
    }
}
