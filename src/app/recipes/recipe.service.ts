import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      'Chicken Tikka Masala',
      'A popular Indian dish',
      'https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg',
      [new Ingredient('Meet', 1), new Ingredient('Tomato', 2)]
    ),
    new Recipe(
      'Chicken Fajitas',
      'A Mexican dish',
      'https://www.tasteofhome.com/wp-content/uploads/2018/01/Flavorful-Chicken-Fajitas_EXPS_CIW19_12540_B08_30_6b-e1722260583441.jpg',
      [new Ingredient('Chicken', 1), new Ingredient('Pepper', 2)]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
