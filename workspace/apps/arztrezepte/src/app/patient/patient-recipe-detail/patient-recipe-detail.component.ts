import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../../shared/recipe.models';
import { Patient } from '../../shared/patient.models';
import { Medication } from '../../shared/medication.models';
import { map, filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';
import { PatientToolbarService } from '../patient-toolbar.service';

@Component({
  selector: 'bh-patient-recipe-detail',
  standalone: true,
  imports: [CommonModule, QRCodeModule],
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
}
