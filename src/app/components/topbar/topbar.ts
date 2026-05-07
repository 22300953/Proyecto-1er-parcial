import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { SearchService } from '../../services/search.service';
import { CartComponent } from '../cart/cart';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CartComponent, RouterLink],
  templateUrl: './topbar.html',
  styleUrls: ['./topbar.css'],
})
export class TopbarComponent {
  private readonly cartService = inject(CartService);
  private readonly searchService = inject(SearchService);
  private readonly router = inject(Router);

  searchIsOpen = this.searchService.isOpen;
  searchQuery = this.searchService.query;
  isMinimal = signal(this.computeMinimal(this.router.url));

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => this.isMinimal.set(this.computeMinimal(e.urlAfterRedirects)));
  }

  goBack() {
    this.router.navigate(['/']);
  }

  private computeMinimal(url: string): boolean {
    const path = url.split('?')[0].split('#')[0];
    return path === '/checkout' || path === '/terminos' || path === '/privacidad';
  }

  countItems() {
    return this.cartService.countItems();
  }

  cartIsOpen() {
    return this.cartService.isCartOpen();
  }

  toggleCart() {
    this.cartService.toggleCart();
  }

  toggleSearch() {
    const willOpen = !this.searchService.isOpen();
    this.searchService.toggle();
    if (willOpen && this.router.url !== '/') {
      this.router.navigate(['/']);
    }
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchService.setQuery(input.value);
  }

  logOut() {
    console.info('La acción de cerrar sesión todavía no está implementada.');
  }
}
