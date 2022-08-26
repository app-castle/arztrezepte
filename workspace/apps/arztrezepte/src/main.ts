import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot([
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
          path: 'patient',
          loadComponent: () =>
            import('./app/pharmacy/pharmacy.component').then(
              (mod) => mod.PharmacyComponent
            ),
        },
      ])
    ),
  ],
}).catch((err) => console.error(err));
