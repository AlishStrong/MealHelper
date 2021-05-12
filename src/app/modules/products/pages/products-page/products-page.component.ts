import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  editProductForm: FormGroup;

  product$: Observable<Product>;
  edit$ = new BehaviorSubject(false);
  private readonly _productsJSON = 'assets/products-mock.json';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      map((pMap: ParamMap) => pMap.get('productName')),
      switchMap((productName: string) => {
        return this.http.get<Product[]>(this._productsJSON).pipe(
          map((products: Product[]) => {
            return products.find((product: Product) => product.name === productName);
          }),
          tap((p: Product) => {
            this.editProductForm = new FormGroup({
              name: new FormControl(p.name, Validators.required),
              brand: new FormControl(p.brand, Validators.required),
              caloriePer100gr: new FormControl(p.caloriePer100gr, [Validators.required, Validators.min(0)]),
              proteinPer100gr: new FormControl(p.proteinPer100gr, [Validators.max(100), Validators.min(0)]),
              carbohydratesPer100gr: new FormControl(p.carbohydratesPer100gr, [Validators.max(100), Validators.min(0)]),
              fatPer100gr: new FormControl(p.fatPer100gr, [Validators.max(100), Validators.min(0)])
            });
          })
        )
      })
    );
  }

  close(): void {
    console.log('Pressed close');
    this.router.navigateByUrl('/products');
  }

  edit(): void {
    console.log(`Want to edit`);
    this.edit$.next(true);
  }

  save(): void {
    console.log(`Want to save`);
    this.edit$.next(false);
    this.product$ = of(Product.fromFormGroupValue(this.editProductForm.value));
  }
}
