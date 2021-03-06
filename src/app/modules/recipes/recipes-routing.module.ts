import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { SearchRecipeComponent } from './components/search-recipe/search-recipe.component';
import { RecipesPageComponent } from './pages/recipes-page/recipes-page.component';

const routes: Routes = [
  { path: '', component: SearchRecipeComponent },
  { path: 'add', component: AddRecipeComponent },
  { path: ':recipesName', component: RecipesPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
