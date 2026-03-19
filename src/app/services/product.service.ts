import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, Observable} from "rxjs"
import { Product } from "../models/product.model";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    // Pedimos el XML como texto plano
    return this.http.get('/productos.xml', { responseType: 'text' }).pipe(
      map((xmlText) => this.parseProductsXml(xmlText))
    );
  }

  private parseProductsXml(xmlText: string): Product[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');

    // Si el XML está mal formado, normalmente aparece <parsererror>
    if (doc.getElementsByTagName('parsererror').length > 0) {
      return [];
    }

    const nodes = Array.from(doc.getElementsByTagName('product'));

    return nodes.map((node) => ({
      id: this.getNumber(node, 'id'),
      name: this.getText(node, 'name'),
      price: this.getNumber(node, 'price'),
      imageUrl: this.normalizeImageUrl(this.getText(node, 'imageUrl') || this.getText(node, 'image')),
      category: this.normalizeCategory(this.getText(node, 'category')),
      description: this.normalizeDescription(this.getText(node, 'description') || this.getText(node, 'portions')),
      inStock: this.hasTag(node, 'inStock') ? this.getBoolean(node, 'inStock') : true,
    }));
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

  private hasTag(parent: Element, tag: string): boolean {
    return parent.getElementsByTagName(tag).length > 0;
  }

  private getText(parent: Element, tag: string): string {
    return parent.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';
  }

  private getNumber(parent: Element, tag: string): number {
    const value = this.getText(parent, tag);
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private getBoolean(parent: Element, tag: string): boolean {
    const value = this.getText(parent, tag).toLowerCase();
    return value === 'true' || value === '1' || value === 'yes';
  }
}
