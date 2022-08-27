import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.models';
import { Medication } from '../medication.models';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'bh-recipe-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent {
  @Input()
  public recipe!: Recipe & { medication: Medication };
}
