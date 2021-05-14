import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Macronutrients } from 'src/app/shared/models/food.model';
import { Product } from 'src/app/shared/models/product.model';
import { Ingredient, Ingredients, Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRecipeComponent implements OnInit {
  public recipeForm: FormGroup;
  public ingredientList: Ingredients = new Array<Ingredient>();

  public products$: Observable<Product[]>;
  public showProductList = true;

  private readonly _productsJSON = 'assets/products-mock.json';
  private selectedProduct: Product;

  constructor(private http: HttpClient, private router: Router) {
    this.recipeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      ingredients: new FormControl(this.ingredientList, Validators.required),
      ingredientName: new FormControl('', [Validators.required]),
      ingredientBrand: new FormControl(''),
      ingredientAmount: new FormControl({ value: null, disabled: this.showProductList }, [Validators.required, Validators.min(1)])
    });
  }

  ngOnInit() {
    this.products$ = this.recipeForm.controls.ingredientName.valueChanges.pipe(
      switchMap((searchWord: string) => iif(
        () => !!searchWord.trim(),
        this.findProducts(searchWord),
        of(new Array<Product>())
      )
      )
    );
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.recipeForm.controls.ingredientName.setValue(product.name);
    this.recipeForm.controls.ingredientBrand.setValue(product.brand);
    this.recipeForm.controls.ingredientAmount.enable({ onlySelf: true });
  }

  addIngredient(): void {
    this.ingredientList.push({
      name: this.recipeForm.controls.ingredientName.value,
      brand: this.recipeForm.controls.ingredientBrand.value,
      amount: this.recipeForm.controls.ingredientAmount.value,
      caloriePer100gr: this.selectedProduct.caloriePer100gr,
      carbohydratesPer100gr: this.selectedProduct.carbohydratesPer100gr,
      fatPer100gr: this.selectedProduct.fatPer100gr,
      proteinPer100gr: this.selectedProduct.proteinPer100gr
    });
    this.recipeForm.controls.ingredientName.reset('');
    this.recipeForm.controls.ingredientBrand.reset();
    this.recipeForm.controls.ingredientAmount.reset();
  }

  removeIngredient(ingredientName: string, ingredientBrand: string): void {
    this.ingredientList = this.ingredientList.filter((ingredient: Ingredient) => {
      return !(ingredient.name === ingredientName && ingredient.brand === ingredientBrand);
    });
    this.recipeForm.controls.ingredients.setValue(this.ingredientList);
  }

  addNewRecipe(): void {
    const caloriePer100gr = this.calculateCaloriePer100gr();
    const macros = this.calculateMacronutrients();
    const newRecipe = Recipe.fromFormGroupValue({ ...this.recipeForm.value, caloriePer100gr, ...macros });
    this.ingredientList = new Array<Ingredient>();
    this.recipeForm.reset({
      name: '',
      ingredients: this.ingredientList,
      ingredientName: '',
      ingredientBrand: '',
      ingredientAmount: null
    });
    console.log(newRecipe);
  }

  cancel(): void {
    this.router.navigateByUrl('recipes');
  }

  private calculateCaloriePer100gr(): number {
    let totalCalorie = 0;
    let totalAmount = 0;
    this.ingredientList.forEach(({ caloriePer100gr, amount }) => {
      totalCalorie += caloriePer100gr * amount;
      totalAmount += amount;
    });
    return totalCalorie / totalAmount;
  }

  private calculateMacronutrients(): Macronutrients {
    let totalProt = 0;
    let totalCarb = 0;
    let totalFat = 0;
    let totalAmount = 0;
    this.ingredientList.forEach(({ amount, proteinPer100gr, carbohydratesPer100gr, fatPer100gr }) => {
      totalCarb += carbohydratesPer100gr * amount;
      totalFat += fatPer100gr * amount;
      totalProt += proteinPer100gr * amount;
      totalAmount += amount;
    });
    return {
      carbohydratesPer100gr: totalCarb / totalAmount,
      fatPer100gr: totalFat / totalAmount,
      proteinPer100gr: totalProt / totalAmount
    };
  }

  private findProducts(searchWord: string): Observable<Product[]> {
    return this.http.get<Product[]>(this._productsJSON).pipe(
      map(products => products.filter((product: Product) => product.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()))),
      tap((products: Product[]) => {
        const currentName = this.recipeForm.controls.ingredientName.value;
        if (products.filter((p: Product) => p.name === currentName).length === 0) {
          this.showProductList = true;
        } else {
          this.showProductList = false;
        }
      })
    );
  }
}
