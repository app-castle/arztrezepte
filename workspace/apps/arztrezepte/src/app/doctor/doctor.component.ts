import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Patient } from '../shared/patient.models';
import { PatientService } from '../shared/patient.service';

@Component({
  selector: 'bh-doctor',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorComponent {
  public patients$: Observable<Patient[]>;
  public filteredPatients$: Observable<Patient[]>;
  public patientInput = new FormControl('');
  public selectedPatient: Patient | null = null;

  constructor(public service: PatientService) {
    this.patients$ = this.service.getAll();
    this.filteredPatients$ = this.initAutocomplete();
  }

  public onPatientSelected(args: MatAutocompleteSelectedEvent) {
    this.selectedPatient = args?.option?.value;
  }

  public patientDisplayFn(p: Patient): string {
    return p ? `${p.Firstname} ${p.Lastname}` : '';
  }

  private initAutocomplete() {
    return this.patientInput.valueChanges.pipe(
      startWith(''),
      switchMap((value) => {
        const name = typeof value === 'string' ? value : null;
        return name ? this.filterPatients(name) : this.patients$;
      })
    );
  }
  private filterPatients(value: string): Observable<Patient[]> {
    const filterValue = value.toLowerCase();

    return this.patients$.pipe(
      map((p) =>
        p.filter(
          (p) =>
            p.Firstname.toLowerCase().includes(filterValue) ||
            p.Lastname.toLowerCase().includes(filterValue)
        )
      )
    );
  }
}
