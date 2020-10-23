import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductQuery } from 'service';
import { ProductState } from 'service';

@Component({
  selector: 'my-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() public product: Product;
  @Input() public layout: string;
  public constructor(public productQuery: ProductQuery ) { }

  public ngOnInit(): void {
  }

}
