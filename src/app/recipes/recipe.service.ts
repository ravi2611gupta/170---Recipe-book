import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  
  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Tikka Masala',
      'A popular Indian dish',
      'https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg'
    ),
    new Recipe(
      'Chicken Fajitas',
      'A Mexican dish',
      'https://www.tasteofhome.com/wp-content/uploads/2018/01/Flavorful-Chicken-Fajitas_EXPS_CIW19_12540_B08_30_6b-e1722260583441.jpg'
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
