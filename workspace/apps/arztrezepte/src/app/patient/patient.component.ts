import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Patient } from '../shared/patient.models';

@Component({
  selector: 'bh-patient',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientComponent {
  public patient$: Observable<Patient>;
  constructor(route: ActivatedRoute) {
    this.patient$ = route.data.pipe(
      map((data) => data['patient']),
      filter((patient) => patient)
    );
  }
}
