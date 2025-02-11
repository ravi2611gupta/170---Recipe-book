import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class dataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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

  // fetchRecipes() {
  //     return this.http
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
  //         }),
  //         tap(recipes => {
  //             this.recipeService.setRecipes(recipes);
  //         })
  //       )
  //     //   .subscribe((recipes) => {
  //     //     // console.log(recipes);
  //     //   });
  //   }
  // }

  // fetchRecipes() {
  //   return this.authService.user.pipe(
  //     take(1),
  //     exhaustMap((user) => {
  //       return this.http.get<Recipe[]>(
  //         'https://ng-course-recipe-book-a97e7-default-rtdb.firebaseio.com/recipes.json',
  //         {
  //           params: new HttpParams().set('auth', user.token)
  //         }
  //       );
  //     }),
  //     map((recipes) => {
  //       return recipes.map((recipe) => {
  //         return {
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : [],
  //         };
  //       });
  //     }),
  //     tap((recipes) => {
  //       this.recipeService.setRecipes(recipes);
  //     })
  //   );
  // }

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
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
