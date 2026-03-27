import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly apiUrl = 'http://localhost:3000/api/productos';
  private readonly http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      map((products) => products.map((product) => this.normalizeProduct(product)))
    );
  }

  // Alias para mantener compatibilidad con llamadas existentes en el proyecto.
  getAll(): Observable<Product[]> {
    return this.getProducts();
  }

  private normalizeProduct(product: Product): Product {
    return {
      id: Number.isFinite(Number(product.id)) ? Number(product.id) : 0,
      name: (product.name || '').trim(),
      price: Number.isFinite(Number(product.price)) ? Number(product.price) : 0,
      imageUrl: this.normalizeImageUrl(product.imageUrl || ''),
      category: this.normalizeCategory(product.category || ''),
      description: this.normalizeDescription(product.description || ''),
      inStock: product.inStock ?? true,
    };
  }

  private normalizeCategory(value: string): string {
    const normalized = value.trim().toLowerCase();

    if (normalized === 'gelatinas') {
      return 'Gelatina';
    }

    if (normalized === 'galletas') {
      return 'Galleta';
    }

    if (normalized === 'pasteles') {
      return 'Pastel';
    }

    if (normalized === 'tartas') {
      return 'Tarta';
    }

    if (normalized === 'otros') {
      return 'Otro';
    }

    return value;
  }

  private normalizeDescription(value: string): string {
    return value
      .replace(/\b(\d+)\s*portions?\b/gi, '$1 porciones')
      .replace(/\b(\d+)\s*pieces?\b/gi, '$1 piezas');
  }

  private normalizeImageUrl(imageValue: string): string {
    const image = imageValue.trim();

    if (!image) {
      return '/assets/logo.png';
    }

    if (/^https?:\/\//i.test(image) || image.startsWith('/')) {
      return image;
    }

    return `/assets/${image}`;
  }
}
