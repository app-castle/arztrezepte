import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bh-pharmacy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PharmacyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
