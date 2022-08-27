import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../shared/recipe.models';
import { RecipeService } from '../shared/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver implements Resolve<Recipe | null> {
  constructor(private recipeService: RecipeService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Recipe> | null {
    const id = route.paramMap.get('id');
    if (id) return this.recipeService.getCompleteRecipe(id);
    return null;
  }
}
