import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Patient } from '../../shared/patient.models';
import { PatientService } from '../../shared/patient.service';
import { Recipe } from '../../shared/recipe.models';
import { RecipeService } from '../../shared/recipe.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bh-pharmacy-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pharmacy-list.component.html',
  styleUrls: ['./pharmacy-list.component.scss'],
})
export class PharmacyListComponent {
  public list$: Observable<Array<Patient & { recipes: Recipe[] }>>;

  constructor(patientService: PatientService, recipeService: RecipeService) {
    this.list$ = patientService.getAll().pipe(
      switchMap((patients) =>
        combineLatest(
          patients.map((patient) =>
            recipeService.getAll().pipe(
              map((recipes) =>
                recipes.filter((r) => r.PatientId === patient.id)
              ),
              map((recipes) => ({ ...patient, recipes }))
            )
          )
        )
      )
    );
  }
}
