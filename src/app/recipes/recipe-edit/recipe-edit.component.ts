import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        recipe.ingredients.forEach((ing) => {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ing.name),
              amount: new FormControl(ing.amount),
            })
          );
        });
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      description: new FormControl(recipeDescription),
      imagePath: new FormControl(recipeImagePath),
      ingredients: recipeIngredients,
    });
  }

  get formIngredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        name: new FormControl(null),
        amount: new FormControl(null)
      })
    )
  }
}
