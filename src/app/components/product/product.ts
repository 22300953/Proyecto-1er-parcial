import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() add = new EventEmitter<Product>();
  recentlyAdded = signal(false);
  private feedbackTimeoutId: ReturnType<typeof setTimeout> | null = null;

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
