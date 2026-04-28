import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog';
import { CartComponent } from './components/cart/cart';
import { ProductDetailComponent } from './components/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: '**', redirectTo: '' },
];
