import { Component, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { cartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Signal } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class cartComponent {
  cart: Signal<Product[]>;
  total = computed(() => this.cartService.total());

  constructor(private cartService: cartService) {
    this.cart = this.cartService.productos;
  }

  quitar(id: number) {
    this.cartService.quitar(id);
  }

  vaciar() {
    this.cartService.vaciar();
  }

  exportarXML() {
    this.cartService.exportarXML();
  }
}

