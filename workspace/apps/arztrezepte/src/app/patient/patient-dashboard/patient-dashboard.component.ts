import { Component } from '@angular/core';
import { RecipeService } from '../../shared/recipe.service';
import { Observable } from 'rxjs';
import { Recipe } from '../../shared/recipe.models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Patient } from '../../shared/patient.models';
import { map, filter, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from '../../shared/recipe-card/recipe-card.component';
import { Medication } from '../../shared/medication.models';

@Component({
  selector: 'bh-patient-dashboard',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent, RouterModule],
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
})
export class PatientDashboardComponent {
  public latestRecipe$: Observable<Recipe & { medication: Medication }>;

  constructor(route: ActivatedRoute, recipeService: RecipeService) {
    this.latestRecipe$ = (route.parent as ActivatedRoute).data.pipe(
      map((data) => data['patient'] as Patient),
      filter((patient) => !!patient),
      switchMap((patient) => recipeService.getAllOfPatient(patient.id)),
      map((recipes) => recipes.reverse()?.[0])
    );
  }
}
