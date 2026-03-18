import { Component, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/producto.model';
import { ProductsService } from '../../services/productos.service';
import { CarritoService } from '../../services/carrito.service';
import { ProductCardComponent } from '../producto/producto';
import { CarritoComponent } from '../carrito/carrito';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, CarritoComponent, CommonModule],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent {
  private productsService = inject(ProductsService);
  private carritoService = inject(CarritoService);
  products = signal<Product[]>([]);
  inStockCount = computed(() => this.products().filter(p => p.inStock).length);

  constructor() {
    this.productsService.getAll().subscribe({
      next: (data: Product[]) => this.products.set(data),
      error: (err: any) => console.error('Error cargando XML:', err),
    });
  }

  agregar(producto: Product) {
    this.carritoService.agregar(producto);
  }
}
