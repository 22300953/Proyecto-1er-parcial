import { isPlatformBrowser } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { inject, PLATFORM_ID } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ProductCardComponent } from '../product/product';
import { CartComponent } from '../cart/cart';

type FilterKey = 'todos' | 'pasteles' | 'gelatinas' | 'galletas' | 'pays' | 'otros';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [ProductCardComponent, CartComponent],
  templateUrl: './catalog.html',
  styleUrls: ['./catalog.css'],
})
export class CatalogComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  products = signal<Product[]>([]);
  selectedFilter = signal<FilterKey>('todos');
  inStockCount = computed(() => this.products().filter(p => p.inStock).length);
  filteredProducts = computed(() => {
    const filter = this.selectedFilter();
    const list = this.products();

    if (filter === 'todos') {
      return list;
    }

    return list.filter(product => this.matchesFilter(product.category, filter));
  });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.productsService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products.set(data);
        console.log('Productos recibidos', data);
      },
      error: (err: any) => console.error('Error cargando productos desde API:', err),
    });
  }

  addToCart(product: Product) {
    this.cartService.agregar(product);
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

  setFilter(filter: FilterKey) {
    this.selectedFilter.set(filter);
  }

  isSelectedFilter(filter: FilterKey): boolean {
    return this.selectedFilter() === filter;
  }

  private normalizeCategory(value: string): string {
    return value.trim().toLowerCase();
  }

  private matchesFilter(category: string, filter: Exclude<FilterKey, 'todos'>): boolean {
    const normalizedCategory = this.normalizeCategory(category);
    const aliases: Record<Exclude<FilterKey, 'todos'>, string[]> = {
      pasteles: ['pastel', 'pasteles'],
      gelatinas: ['gelatina', 'gelatinas'],
      galletas: ['galleta', 'galletas'],
      pays: ['pie', 'pies', 'pay', 'payes', 'tarta', 'tartas'],
      otros: ['otro', 'otros'],
    };

    return aliases[filter].includes(normalizedCategory);
  }

}

