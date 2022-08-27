import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Medication } from '../../shared/medication.models';
import { Patient } from '../../shared/patient.models';
import { RecipeCardComponent } from '../../shared/recipe-card/recipe-card.component';
import { Recipe } from '../../shared/recipe.models';
import { RecipeService } from '../../shared/recipe.service';

@Component({
  selector: 'bh-recipe-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    RecipeCardComponent,
    RouterModule,
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  public recipes$: Observable<Array<Recipe & { medication: Medication }>>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.recipes$ = (this.route.parent as ActivatedRoute).data.pipe(
      map((data) => data['patient'] as Patient),
      filter((patient) => !!patient),
      switchMap((patient) => this.recipeService.getAllOfPatient(patient.id))
    );
  }
}
