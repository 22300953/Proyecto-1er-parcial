import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private cartService = inject(CartService);

  items: Signal<Product[]>;
  isOpen: Signal<boolean>;
  total = computed(() => this.cartService.total());

  constructor() {
    this.items = this.cartService.products;
    this.isOpen = this.cartService.isCartOpen;
  }

  removeItem(id: number) {
    this.cartService.quitar(id);
  }

  clearCart() {
    this.cartService.vaciar();
  }

  closeCart() {
    this.cartService.closeCart();
  }

  exportXml() {
    this.cartService.exportarXML();
  }
  
}

