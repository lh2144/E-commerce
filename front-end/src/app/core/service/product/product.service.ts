import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductState, ProductStore } from './product.store';

@Injectable({ providedIn: 'root' })
export class ProductService {
    public constructor(
        public http: HttpClient,
        public productStore: ProductStore
    ) {}

    public getAllProduct(): Observable<ProductState[]> {
      return this.http.get(environment.base + 'products').pipe(map((res) => {
          this.productStore.set(res['data']);
          return res['data'];
      }));
    }
}
