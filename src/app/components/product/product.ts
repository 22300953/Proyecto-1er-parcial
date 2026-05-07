import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() add = new EventEmitter<Product>();
  recentlyAdded = signal(false);
  private feedbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

  get portions(): string | null {
    const match = this.product?.description?.match(/\b\d+\s*(porciones?|piezas?)\b/i);
    return match ? match[0] : null;
  }

  get descriptionWithoutPortions(): string {
    return this.product?.description?.replace(/\b\d+\s*(porciones?|piezas?)\b/gi, '').trim() || '';
  }

  onAdd() {
    this.recentlyAdded.set(true);
    if (this.feedbackTimeoutId) {
      clearTimeout(this.feedbackTimeoutId);
    }

    this.feedbackTimeoutId = setTimeout(() => {
      this.recentlyAdded.set(false);
      this.feedbackTimeoutId = null;
    }, 900);

    this.add.emit(this.product);
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = '/assets/logo.png';
  }
}
