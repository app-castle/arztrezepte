import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { PatientComponent } from './patient.component';
import { PatientResolver } from './patient.resolver';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientRecipeDetailComponent } from './patient-recipe-detail/patient-recipe-detail.component';
import { RecipeResolver } from './recipe.resolver';

export const PATIENT_ROUTING: Routes = [
  {
    path: ':id',
    component: PatientComponent,
    resolve: {
      patient: PatientResolver,
    },
    children: [
      {
        path: 'recepies',
        component: RecipeListComponent,
      },
      {
        path: 'recipe/:id',
        component: PatientRecipeDetailComponent,
        resolve: {
          recipe: RecipeResolver,
        },
      },
    ],
  },
  {
    path: '**',
    component: PatientListComponent,
  },
];
