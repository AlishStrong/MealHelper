import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'products', loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule) },
  { path: 'recipes', loadChildren: () => import('./modules/recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
