import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    ean: new FormControl(),
    caloriePer100gr: new FormControl(0, [Validators.required, Validators.min(0)]),
    proteinPer100gr: new FormControl(0, [Validators.max(100), Validators.min(0)]),
    carbohydratesPer100gr: new FormControl(0, [Validators.max(100), Validators.min(0)]),
    fatPer100gr: new FormControl(0, [Validators.max(100), Validators.min(0)])
  });

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  addNewProduct(): void {
    const newProduct = Product.fromFormGroupValue(this.productForm.value);
    this.productForm.reset({
      name: '',
      brand: '',
      ean: '',
      caloriePer100gr: 0,
      proteinPer100gr: 0,
      carbohydratesPer100gr: 0,
      fatPer100gr: 0
    });
    console.log(newProduct);
  }

  cancel(): void {
    this.router.navigateByUrl('products');
  }
}
