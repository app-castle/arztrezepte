import { Routes } from '@angular/router';
import { PharmacyComponent } from './pharmacy.component';
import { RecipeResolver } from './recipe.resolver';

export const PHARMACY_ROUTING: Routes = [
  {
    path: ':id',
    component: PharmacyComponent,
    resolve: {
      recipe: RecipeResolver,
    },
  },
];
