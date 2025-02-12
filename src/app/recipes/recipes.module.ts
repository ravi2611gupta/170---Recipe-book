import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  //   exports: [
  //     RecipesComponent,
  //     RecipeListComponent,
  //     RecipeItemComponent,
  //     RecipeDetailComponent,
  //     RecipeStartComponent,
  //     RecipeEditComponent,
  //   ],
  // ! We don't need to export anymore after importing the RecipeRoutingModule. Because we used these component there. and these component are not being used in any other component except recipes.
  // ! We no longer need to export the components after importing the RecipeRoutingModule because those components are only used within the Recipes component and not in any other components."

  imports: [
    // RouterModule,
    // CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ],
})
export class RecipesModule {}
