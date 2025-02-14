import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Chicken Tikka Masala',
  //     'A popular Indian dish',
  //     'https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg',
  //     [new Ingredient('Meet', 1), new Ingredient('Tomato', 2)]
  //   ),
  //   new Recipe(
  //     'Chicken Fajitas',
  //     'A Mexican dish',
  //     'https://www.tasteofhome.com/wp-content/uploads/2018/01/Flavorful-Chicken-Fajitas_EXPS_CIW19_12540_B08_30_6b-e1722260583441.jpg',
  //     [new Ingredient('Chicken', 1), new Ingredient('Pepper', 2)]
  //   ),
  // ];

  private recipes: Recipe[] = [];

  constructor(private store: Store<fromApp.AppState>) {}

  recipesChanged = new Subject<Recipe[]>();

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
