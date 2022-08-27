import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Patient } from '../shared/patient.models';
import { PatientService } from '../shared/patient.service';
import { Recipe } from '../shared/recipe.models';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'bh-pharmacy',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PharmacyComponent {
  public patients$: Observable<Patient[]>;
  public recipes$: Observable<Recipe[]>;
  public filteredRecipes$: Observable<Recipe[]>;
  public recipeInput = new FormControl('');

  constructor(public patientService: PatientService, public recipeService: RecipeService) {
    this.patients$ = this.patientService.getAll();
    this.recipes$ = this.recipeService.getAll();
    this.filteredRecipes$ = this.initAutocomplete();
  }

private initAutocomplete() {
    return this.recipeInput.valueChanges.pipe(
      startWith(''),
      switchMap((textValue) =>
        textValue ? this.filterRecipes(textValue) : this.recipes$
      )
    );
  }
  private filterRecipes(value: string): Observable<Recipe[]> {
    const filterValue = value.toLowerCase();

    return this.recipes$.pipe(
      map((p) =>
        p.filter(
          (p) =>
            p.DoctorName.toLowerCase().includes(filterValue) ||
            p.Date.toLowerCase().includes(filterValue)
        )
      )
    );
  }
}
