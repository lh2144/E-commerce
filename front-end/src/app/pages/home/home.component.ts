import { Component, OnInit } from '@angular/core';
import { ProductQuery, ProductService } from 'service';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public allProducts = this.productQuery.allProducts$;
  public constructor(public productService: ProductService, public productQuery: ProductQuery) { }

  public ngOnInit(): void {
    this.productService.getAllProduct().subscribe();
  }

}
