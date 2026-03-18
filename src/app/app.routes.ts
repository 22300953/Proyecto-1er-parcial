import { Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog';
import { cartComponent } from './components/cart/cart';

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'cart', component: cartComponent },
  { path: '**', redirectTo: '' },
];
