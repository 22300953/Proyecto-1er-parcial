import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { cartService } from '../../services/cart.service';
import { ProductCardComponent } from '../product/product';
import { cartComponent } from '../cart/cart';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, cartComponent, CommonModule],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css'],
})
export class catalogComponent {
  private productsService = inject(ProductsService);
  private cartService = inject(cartService);
  products = signal<Product[]>([]);
  inStockCount = computed(() => this.products().filter(p => p.inStock).length);

  constructor() {
    this.productsService.getAll().subscribe({
      next: (data: Product[]) => this.products.set(data),
      error: (err: any) => console.error('Error cargando XML:', err),
    });
  }

  agregar(product: Product) {
    this.cartService.agregar(product);
  }
}
