import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Food } from 'src/app/shared/models/food.model';
import { Product } from 'src/app/shared/models/product.model';
import { Ingredient, Ingredients, Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRecipeComponent implements OnInit {
  private foodMock: Product[] = [
    {
      name: 'Banana',
      brand: 'Fairtrade',
      caloriePer100gr: 23,
      proteinPer100gr: 0.56,
      carbohydratesPer100gr: 3.45,
      fatPer100gr: 0.3
    },
    {
      name: 'Orange',
      brand: '',
      caloriePer100gr: 45,
      proteinPer100gr: 0.2,
      carbohydratesPer100gr: 9.3,
      fatPer100gr: 0.01
    }
  ];

  ingredientList: Ingredients = new Array<Ingredient>();

  products$: Observable<Product[]>;
  showProductList = true;
  private readonly _productsJSON = 'assets/products-mock.json';

  recipeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ingredients: new FormControl(this.ingredientList, Validators.required),
    ingredientName: new FormControl('', [Validators.required]),
    ingredientBrand: new FormControl(''),
    ingredientAmount: new FormControl(null, [Validators.required, Validators.min(1)])
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.products$ = this.recipeForm.get('ingredientName').valueChanges.pipe(
      tap(console.log),
      switchMap((searchWord: string) => iif(
        () => !!searchWord.trim(),
        this.findProducts(searchWord),
        of(new Array<Product>())
      )
      )
    );
  }

  private findProducts(searchWord: string) {
    return this.http.get<Product[]>(this._productsJSON).pipe(
      map(products => {
        const toReturn = products.filter((product: Product) => product.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()));
        const currentName = this.recipeForm.get('ingredientName').value;
        console.log(`CurrentName ${currentName}`);
        if (toReturn.filter((p: Product) => p.name === currentName).length === 0) {
          console.log(`Product list does not have CurrentName - ${currentName}`);
          this.showProductList = true;
        } else {
          console.log(`Product list includes CurrentName - ${currentName}`);
          this.showProductList = false;
        }
        return toReturn;
      }),
      // tap((products: Product[]) => {
      //   console.log(`Searching`);
      //   if (products && // server returned a list of products
      //     products.length > 0 && // the returned list of products is not empty
      //     products.filter((pr: Product) => {
      //       return pr.name === this.recipeForm.get('ingredientName').value;
      //     }).length === 0 // the list does not contain already selected ingredient
      //   ) {
      //     console.log(`showProductList$ TRUE`);
      //     this.showProductList$.next(true);
      //   } else {
      //     console.log(`showProductList$ FALSE`);
      //     this.showProductList$.next(false);
      //   }
      // })
    );
  }

  selectProduct(product: Product): void {
    console.log(`You selected ${product.name}`);
    this.recipeForm.get('ingredientName').setValue(product.name);
    this.recipeForm.get('ingredientBrand').setValue(product.brand);
  }

  addNewRecipe(): void {
    const newRecipe = Recipe.fromFormGroupValue(this.recipeForm.value);
    console.log(newRecipe);
  }

  removeIngredient(ingredientName: string): void {
    // this.ingredientList.delete(ingredientName);
  }

  addIngredient(): void {
    // this.ingredientList.set(
    //   this.recipeForm.controls.ingredientName.value,
    //   this.recipeForm.controls.ingredientAmount.value,
    // );
    // this.recipeForm.controls.ingredientName.reset();
    // this.recipeForm.controls.ingredientAmount.reset();
  }
}
