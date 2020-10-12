import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/core/service/product/product.model';

@Component({
  selector: 'my-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() public product: Product;
  public constructor() { }

  public ngOnInit(): void {
  }

}
