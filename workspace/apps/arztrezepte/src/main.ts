import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { environment } from './environments/environment';
import { HomeComponent } from './app/home/home.component';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
        {path: '', component: HomeComponent},
        {
          path: 'doctor',
          loadComponent: () =>
            import('./app/doctor/doctor.component').then(
              (mod) => mod.DoctorComponent
            ),
        },
        {
          path: 'patient',
          loadComponent: () =>
            import('./app/patient/patient.component').then(
              (mod) => mod.PatientComponent
            ),
        },
        {
          path: 'pharmacy',
          loadComponent: () =>
            import('./app/pharmacy/pharmacy.component').then(
              (mod) => mod.PharmacyComponent
            ),
        },
      ]),
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFirestore(() => getFirestore())
    ),
  ],
}).catch((err) => console.error(err));
