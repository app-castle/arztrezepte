import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Medication } from '../../shared/medication.models';
import { Patient } from '../../shared/patient.models';
import { Recipe } from '../../shared/recipe.models';
import { PatientToolbarService } from '../patient-toolbar.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'bh-patient-recipe-detail',
  standalone: true,
  imports: [
    CommonModule,
    QRCodeModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatCheckboxModule,
  ],
  templateUrl: './patient-recipe-detail.component.html',
  styleUrls: ['./patient-recipe-detail.component.scss'],
})
export class PatientRecipeDetailComponent implements OnDestroy {
  public recipe$: Observable<
    Recipe & { medication: Medication; patient: Patient }
  >;

  constructor(
    route: ActivatedRoute,
    private toolbarService: PatientToolbarService
  ) {
    this.recipe$ = route.data.pipe(
      map((data) => data['recipe']),
      filter((recipe) => !!recipe)
    );

    this.toolbarService.setBacklinkState(true);
  }

  ngOnDestroy(): void {
    this.toolbarService.setBacklinkState(false);
  }

  isValid(date: string) {
    const today = new Date();
    const validTo = new Date(date);
    return validTo > today;
  }
}
