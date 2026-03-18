import { Component, computed, signal } from '@angular/core';
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
export class CatalogComponent {
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

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.productsService.getAll().subscribe({
      next: (data: Product[]) => this.products.set(data),
      error: (err: any) => console.error('Error cargando XML:', err),
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
    console.info('Logout action is not implemented yet.');
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

