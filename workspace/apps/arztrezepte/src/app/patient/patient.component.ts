import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Patient } from '../shared/patient.models';
import { PatientToolbarService } from './patient-toolbar.service';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'bh-patient',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientComponent {
  public patient$: Observable<Patient>;
  constructor(
    route: ActivatedRoute,
    private location: Location,
    public toolbarService: PatientToolbarService
  ) {
    this.patient$ = route.data.pipe(
      map((data) => data['patient']),
      filter((patient) => patient)
    );
  }

  public navigateBack() {
    this.location.back();
  }
}
