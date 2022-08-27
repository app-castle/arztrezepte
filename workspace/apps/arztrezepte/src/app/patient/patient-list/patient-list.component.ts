import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../shared/patient.models';
import { PatientService } from '../../shared/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bh-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent {
  public patients$: Observable<Patient[]>;

  constructor(private patientService: PatientService) {
    this.patients$ = this.patientService.getAll();
  }
}
