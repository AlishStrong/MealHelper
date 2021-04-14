import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    caloriePer100gr: new FormControl(0, [Validators.required, Validators.min(0)]),
    proteinPer100gr: new FormControl(0, [Validators.max(100), Validators.min(0)]),
    carbohydratesPer100gr: new FormControl(0, [Validators.max(100), Validators.min(0)]),
    fatPer100gr: new FormControl(0, [Validators.max(100), Validators.min(0)])
  });

  constructor() { }

  ngOnInit() {
  }

  addNewProduct(): void {
    let newProduct = Product.fromFormGroupValue(this.productForm.value);
    console.log(newProduct);
  }
}
