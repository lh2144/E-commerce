import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProductState, ProductStore } from './product.store';

@Injectable({ providedIn: 'root' })
export class ProductQuery extends QueryEntity<ProductState> {
    public allProducts$ = this.selectAll();
    public constructor(protected store: ProductStore) {
        super(store);
    }
}
