import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CartService, CustomerData } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Signal } from '@angular/core';

type CartLine = Product & { quantity: number; subtotal: number };

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private cartService = inject(CartService);

  items: Signal<Product[]>;
  isOpen: Signal<boolean>;
  groupedItems = computed<CartLine[]>(() => {
    const map = new Map<number, CartLine>();

    for (const product of this.items()) {
      const existing = map.get(product.id);
      if (existing) {
        existing.quantity += 1;
        existing.subtotal = existing.quantity * existing.price;
        continue;
      }

      map.set(product.id, {
        ...product,
        quantity: 1,
        subtotal: product.price,
      });
    }

    return Array.from(map.values());
  });

  total = computed(() => this.cartService.total());
  validationErrors = signal<string[]>([]);
  customer: CustomerData = {
    name: '',
    phone: '',
    note: '',
    deliveryType: 'store',
    address: '',
    paymentType: 'cash',
  };

  constructor() {
    this.items = this.cartService.products;
    this.isOpen = this.cartService.isCartOpen;
  }

  decreaseQuantity(id: number) {
    this.cartService.decrementarCantidad(id);
  }

  increaseQuantity(id: number) {
    this.cartService.incrementarCantidad(id);
  }

  removeItem(id: number) {
    this.cartService.eliminarLinea(id);
  }

  clearCart() {
    this.cartService.vaciar();
  }

  closeCart() {
    this.cartService.closeCart();
  }

  exportXml() {
    this.cartService.exportarXML(this.customer);
  }

  exportOrder() {
    const errors = this.validateForm();
    if (errors.length > 0) {
      this.validationErrors.set(errors);
      return;
    }

    this.validationErrors.set([]);
    this.exportXml();
  }

  private validateForm(): string[] {
    const errors: string[] = [];
    const customer = {
      name: this.customer.name.trim(),
      phone: this.customer.phone.trim(),
      note: this.customer.note.trim(),
      address: this.customer.address.trim(),
    };

    if (this.items().length === 0) {
      errors.push('Agrega al menos un producto al carrito.');
    }

    if (!customer.name) {
      errors.push('El nombre es obligatorio.');
    }

    if (!customer.phone) {
      errors.push('El teléfono es obligatorio.');
    }

    if (!customer.note) {
      errors.push('La nota es obligatoria.');
    }

    if (this.customer.deliveryType === 'home' && !customer.address) {
      errors.push('La dirección es obligatoria para envío a domicilio.');
    }

    return errors;
  }
  
}

