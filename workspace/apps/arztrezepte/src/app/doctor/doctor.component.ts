import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Medication } from '../shared/medication.models';
import { MedicationService } from '../shared/medication.service';
import { Patient } from '../shared/patient.models';
import { PatientService } from '../shared/patient.service';
import { Recipe } from '../shared/recipe.models';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'bh-doctor',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DoctorComponent {
  public recipe: Recipe = {
    Date: new Date().toISOString(),
    DoctorName: 'Dr. Bernard Häcker',
    Evening: false,
    Lunch: false,
    Morning: false,
  } as any;

  public patients$: Observable<Patient[]>;
  public filteredPatients$: Observable<Patient[]>;
  public patientInput = new FormControl('');
  public selectedPatient: Patient | null = null;

  public medications$: Observable<Medication[]>;
  public filteredMedications$: Observable<Medication[]>;
  public medicationInput = new FormControl('');
  public selectedMedication: Medication | null = null;

  constructor(
    patientService: PatientService,
    medicationService: MedicationService,
    private recipeService: RecipeService
  ) {
    this.patients$ = patientService.getAll();
    this.filteredPatients$ = this.initPatientsAutocomplete();

    this.medications$ = medicationService.getAll();
    this.filteredMedications$ = this.initMedicationsAutocomplete();
  }

  public onPatientSelected(args: MatAutocompleteSelectedEvent) {
    this.selectedPatient = args?.option?.value;

    this.recipe.PatientId = this.selectedPatient?.id ?? '';
  }

  public patientDisplayFn(p: Patient): string {
    return p ? `${p.Firstname} ${p.Lastname}` : '';
  }

  private initPatientsAutocomplete() {
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

  public onMedicationSelected(args: MatAutocompleteSelectedEvent) {
    this.selectedMedication = args?.option?.value;

    this.recipe.MedicationId = this.selectedMedication?.id ?? '';
  }
  public medicationDisplayFn(p: Medication): string {
    return p ? `${p.Name}` : '';
  }

  private initMedicationsAutocomplete() {
    return this.medicationInput.valueChanges.pipe(
      startWith(''),
      switchMap((value) => {
        const name = typeof value === 'string' ? value : null;
        return name ? this.filterMedications(name) : this.medications$;
      })
    );
  }
  private filterMedications(value: string): Observable<Medication[]> {
    const filterValue = value.toLowerCase();

    return this.medications$.pipe(
      map((p) =>
        p.filter(
          (p) =>
            p.Name.toLowerCase().includes(filterValue) ||
            p.Company.toLowerCase().includes(filterValue)
        )
      )
    );
  }

  public onLongTermChange(val: boolean): void {
    const validTo = new Date();
    validTo.setFullYear(validTo.getFullYear() + 1);
    val
      ? (this.recipe.ValidTo = validTo.toISOString())
      : (this.recipe.ValidTo = '');
  }

  public async onSave(): Promise<void> {
    await this.recipeService.create(this.recipe);
  }
}
