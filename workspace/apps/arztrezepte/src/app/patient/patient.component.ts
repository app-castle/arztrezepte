import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient.models';
import { PatientService } from './patient.service';

@Component({
  selector: 'bh-patient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientComponent {
  public patients$: Observable<Patient[]>;

  constructor(private patientService: PatientService) {
    this.patients$ = this.patientService.getAll();
  }
}
