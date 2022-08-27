import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientService } from '../shared/patient.service';
import { Patient } from '../shared/patient.models';

@Injectable({
  providedIn: 'root',
})
export class PatientResolver implements Resolve<Patient | null> {
  constructor(private patientService: PatientService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Patient> | null {
    const id = route.paramMap.get('id');
    if (id) return this.patientService.get(id);
    return null;
  }
}
