import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../../shared/recipe.models';
import { Patient } from '../../shared/patient.models';
import { Medication } from '../../shared/medication.models';
import { map, filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bh-patient-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-recipe-detail.component.html',
  styleUrls: ['./patient-recipe-detail.component.scss'],
})
export class PatientRecipeDetailComponent {
  public recipe$: Observable<
    Recipe & { medication: Medication; patient: Patient }
  >;

  constructor(route: ActivatedRoute) {
    this.recipe$ = route.data.pipe(
      map((data) => data['recipe']),
      filter((recipe) => !!recipe)
    );
  }
}
