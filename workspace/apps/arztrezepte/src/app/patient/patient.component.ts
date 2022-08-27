import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'bh-patient',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, RouterModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientComponent {}
