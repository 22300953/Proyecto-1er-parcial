import { Component, computed, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../product/product';
import { CartComponent } from '../cart/cart';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, CartComponent],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css'],
})
export class CatalogComponent {
  products = signal<Product[]>([]);
  inStockCount = computed(() => this.products().filter(p => p.inStock).length);

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.productsService.getAll().subscribe({
      next: (data: Product[]) => this.products.set(data),
      error: (err: any) => console.error('Error cargando XML:', err),
    });
  }

  agregar(product: Product) {
    this.cartService.agregar(product);
  }
}
