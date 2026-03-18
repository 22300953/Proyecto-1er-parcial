import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/producto.model';

@Component({
  selector: 'app-product-card',
  standalone:true,
  imports: [],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() add = new EventEmitter<Product>();

  onAdd() {
    this.add.emit(this.product);
  }
}
