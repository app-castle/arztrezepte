import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { Medication } from '../shared/medication.models';
import { Patient } from '../shared/patient.models';
import { Recipe } from '../shared/recipe.models';
import { RecipeService } from '../shared/recipe.service';

type RecipeModel = Recipe & { medication: Medication; patient: Patient };

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
  public recipe: RecipeModel;

  constructor(
    private route: ActivatedRoute,
    public recipeService: RecipeService
  ) {
    //this.recipe$ = this.recipeService.getCompleteRecipe("uEtJdGasXsim9ByzvL5T");

    this.recipe = this.route.snapshot.data['recipe'];
  }

  public async onSave(): Promise<void> {
    this.recipe.Used = true;
    await this.recipeService.update(this.recipe.id, { ...this.recipe });
  }
}
