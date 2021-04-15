import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './components/add-product/add-product.component';

@NgModule({
  declarations: [ProductsPageComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
