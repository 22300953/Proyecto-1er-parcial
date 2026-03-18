import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model.ts';

@Component({
  selector: 'app-product-card',
  standalone:true,
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() add = new EventEmitter<Product>();

  onAdd() {
    this.add.emit(this.product);
  }
}
