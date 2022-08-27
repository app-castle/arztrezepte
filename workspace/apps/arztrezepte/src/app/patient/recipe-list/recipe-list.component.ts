import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bh-recipe-list',
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeListComponent {
  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((x) => console.log(x));
  }
}
