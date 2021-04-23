import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';

@NgModule({
  declarations: [AddRecipeComponent, SearchRecipeComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
