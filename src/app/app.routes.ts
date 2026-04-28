import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog';
import { CartComponent } from './components/cart/cart';
import { ProductDetailComponent } from './components/product-detail/product-detail';
import { Checkout } from './components/checkout/checkout';

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: Checkout },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '' },
];
