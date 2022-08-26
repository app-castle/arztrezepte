import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bh-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DoctorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
