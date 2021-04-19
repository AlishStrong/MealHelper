import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

const routes: Routes = [
  { path: '', component: SearchProductComponent },
  { path: 'add', component: AddProductComponent },
  { path: ':productName', component: ProductsPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
