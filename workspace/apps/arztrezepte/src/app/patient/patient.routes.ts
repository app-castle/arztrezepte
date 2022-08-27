import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { PatientComponent } from './patient.component';
import { PatientResolver } from './patient.resolver';
import { PatientListComponent } from './patient-list/patient-list.component';

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
    ],
  },
  {
    path: '**',
    component: PatientListComponent,
  },
];
