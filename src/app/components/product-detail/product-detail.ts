import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { CartComponent } from '../cart/cart';
import { CartService } from '../../services/cart.service';
import { ProductsService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CartComponent],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
})
export class ProductDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal('');

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id') ?? '';
    const id = Number(idParam);

    if (!Number.isFinite(id) || id <= 0) {
      this.error.set('ID de producto inválido.');
      this.loading.set(false);
      return;
    }

    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        if (!product) {
          this.error.set('Producto no encontrado.');
        }
        this.product.set(product);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        console.error('Error cargando producto:', err);
        this.error.set('No se pudo cargar el producto.');
        this.loading.set(false);
      },
    });
  }

  addToCart(): void {
    const currentProduct = this.product();
    if (currentProduct) {
      this.cartService.agregar(currentProduct);
    }
  }

  toggleCart() {
    this.cartService.toggleCart();
  }

  cartIsOpen() {
    return this.cartService.isCartOpen();
  }

  countItems() {
    return this.cartService.countItems();
  }

  logOut() {
    console.info('La acción de cerrar sesión todavía no está implementada.');
  }
}
