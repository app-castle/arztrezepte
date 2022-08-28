import { Routes } from '@angular/router';
import { PharmacyComponent } from './pharmacy.component';
import { RecipeResolver } from './recipe.resolver';
import { PharmacyListComponent } from './pharmacy-list/pharmacy-list.component';

export const PHARMACY_ROUTING: Routes = [
  {
    path: ':id',
    component: PharmacyComponent,
    resolve: {
      recipe: RecipeResolver,
    },
  },
  {
    path: '**',
    component: PharmacyListComponent,
  },
];
