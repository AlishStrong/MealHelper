import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddRecipeComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
