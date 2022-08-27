import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Recipe } from '../shared/recipe.models';
import { Medication } from '../shared/medication.models';
import { Patient } from '../shared/patient.models';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'bh-pharmacy',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
  ],
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PharmacyComponent {
  
  public recipe$: Observable<Recipe & { medication: Medication, patient: Patient }>;

  constructor(
    route: ActivatedRoute,
    public recipeService: RecipeService)
  {
    //this.recipe$ = this.recipeService.getCompleteRecipe("uEtJdGasXsim9ByzvL5T");

    this.recipe$ = route.data.pipe(
      map((data) => data['recipe']),
      filter((recipe) => !!recipe)
    );
  }

  public async onSave(recipe: Recipe & { medication: Medication, patient: Patient }): Promise<void> {
    recipe.Used=true;
    await this.recipeService.update(recipe.id, recipe);
  }

}
