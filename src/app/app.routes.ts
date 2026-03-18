import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog';
import { CartComponent } from './components/cart/cart';

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' },
];
