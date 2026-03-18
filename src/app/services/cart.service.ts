import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class cartService {
  // Lista reactiva del cart
  private productsSignal = signal<Product[]>([]);

  // Exponer como readonly
  products = this.productsSignal.asReadonly();

  agregar(product: Product) {
    this.productsSignal.update(lista => [...lista, product]);
  }

  quitar(id: number) {
    this.productsSignal.update(lista => lista.filter(p => p.id !== id));
  }

  vaciar() {
    this.productsSignal.set([]);
  }

  total(): number {
    return this.productsSignal().reduce((acc, p) => acc + p.price, 0);
  }

  exportarXML() {
    const products = this.productsSignal();

    // Estructura XML manual
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n`;

    for (const p of products) {
      xml += `  <product>\n`;
      xml += `    <id>${p.id}</id>\n`;
      xml += `    <nombre>${this.escapeXml(p.name)}</nombre>\n`;
      xml += `    <precio>${p.price}</precio>\n`;
      if (p.description) {
        xml += `    <descripcion>${this.escapeXml(p.description)}</descripcion>\n`;
      }
      xml += `  </product>\n`;
    }

    xml += `  <total>${this.total()}</total>\n`;
    xml += `</recibo>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'recibo.xml';
    a.click();

    URL.revokeObjectURL(url);
  }

  private escapeXml(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');
  }
}
