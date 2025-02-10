import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class dataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http
      .put(
        'https://ng-course-recipe-book-a97e7-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

//   fetchRecipes() {
//     this.http
//       .get<Recipe[]>(
//         'https://ng-course-recipe-book-a97e7-default-rtdb.firebaseio.com/recipes.json'
//       )
//       .pipe(
//         map((recipes) => {
//           return recipes.map((recipe) => {
//             return {
//               ...recipe,
//               ingredients: recipe.ingredients ? recipe.ingredients : [],
//             };
//           });
//         })
//       )
//       .subscribe((recipes) => {
//         // console.log(recipes);
//         this.recipeService.setRecipes(recipes);
//       });
//   }


fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-course-recipe-book-a97e7-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
      )
    //   .subscribe((recipes) => {
    //     // console.log(recipes);
    //   });
  }
}
