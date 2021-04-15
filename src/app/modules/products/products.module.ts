import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchProductComponent } from './components/search-product/search-product.component';

@NgModule({
  declarations: [
    ProductsPageComponent, 
    AddProductComponent, 
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class ProductsModule { }
