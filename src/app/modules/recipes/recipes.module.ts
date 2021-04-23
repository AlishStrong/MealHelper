import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';
import { RecipesRoutingModule } from './recipes-routing.module';


@NgModule({
  declarations: [AddRecipeComponent, SearchRecipeComponent, RecipesPageComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule
  ]
})
export class RecipesModule { }
