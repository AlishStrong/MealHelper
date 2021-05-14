import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Macronutrients } from 'src/app/shared/models/food.model';
import { Product } from 'src/app/shared/models/product.model';
import { Ingredient, Ingredients, Portion, Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['./recipes-page.component.css']
})
export class RecipesPageComponent implements OnInit {
  public ingredientList: Ingredients;
  public editRecipeForm: FormGroup;
  public showProductList = true;
  private selectedProduct: Product;
  public recipe$: Observable<Recipe>;
  public products$: Observable<Product[]>;
  public edit$ = new BehaviorSubject(false);
  private readonly _recipesJSON = 'assets/recipes-mock.json';
  private readonly _productsJSON = 'assets/products-mock.json';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipe$ = this.route.paramMap.pipe(
      map((rMap: ParamMap) => rMap.get('recipesName')),
      switchMap((recipesName: string) => {
        return this.http.get(this._recipesJSON).pipe(
          map((recipes: Recipe[]) => {
            return recipes.find((rec: Recipe) => rec.name === recipesName);
          }),
          tap((r: Recipe) => {
            this.ingredientList = r.ingredients;
            this.editRecipeForm = new FormGroup({
              name: new FormControl(r.name, Validators.required),
              portions: new FormControl(r.portions),
              ingredients: new FormControl(r.ingredients, Validators.required),
              ingredientName: new FormControl('', [Validators.required]),
              ingredientBrand: new FormControl(''),
              ingredientAmount: new FormControl({ value: null, disabled: this.showProductList }, [Validators.required, Validators.min(1)])
            });

            this.products$ = this.editRecipeForm.controls.ingredientName.valueChanges.pipe(
              switchMap((searchWord: string) => iif(
                () => !!searchWord.trim(),
                this.findProducts(searchWord),
                of(new Array<Product>())
              )
              )
            );
          })
        )
      })
    );

  }

  close(): void {
    console.log('Pressed close');
    this.router.navigateByUrl('/recipes');
  }

  edit(): void {
    console.log(`Want to edit`, this.editRecipeForm);
    this.edit$.next(true);
  }

  updateRecipe(): void {
    console.log(`Want to update Recipe`);
    this.edit$.next(false);
    const caloriePer100gr = this.calculateCaloriePer100gr();
    const macros = this.calculateMacronutrients();
    this.recipe$ = of(Recipe.fromFormGroupValue({ ...this.editRecipeForm.value, caloriePer100gr, ...macros }));
  }

  removeIngredient(ingredientName: string, ingredientBrand: string): void {
    this.ingredientList = this.ingredientList.filter((ingredient: Ingredient) => {
      return !(ingredient.name === ingredientName && ingredient.brand === ingredientBrand);
    });
    this.editRecipeForm.controls.ingredients.setValue(this.ingredientList);
  }

  addIngredient(): void {
    this.ingredientList.push({
      name: this.editRecipeForm.controls.ingredientName.value,
      brand: this.editRecipeForm.controls.ingredientBrand.value,
      amount: this.editRecipeForm.controls.ingredientAmount.value,
      caloriePer100gr: this.selectedProduct.caloriePer100gr,
      carbohydratesPer100gr: this.selectedProduct.carbohydratesPer100gr,
      fatPer100gr: this.selectedProduct.fatPer100gr,
      proteinPer100gr: this.selectedProduct.proteinPer100gr
    });
    this.editRecipeForm.controls.ingredientName.reset('');
    this.editRecipeForm.controls.ingredientBrand.reset();
    this.editRecipeForm.controls.ingredientAmount.reset();
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    this.editRecipeForm.controls.ingredientName.setValue(product.name);
    this.editRecipeForm.controls.ingredientBrand.setValue(product.brand);
    this.editRecipeForm.controls.ingredientAmount.enable({ onlySelf: true });
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

  getPortion(recipe: Recipe): Portion {
    const amount = recipe.ingredients.map((ingr) => ingr.amount).reduce((prev, curr) => prev + curr) / recipe.portions;
    const calories = amount * recipe.caloriePer100gr / 100;
    const protein = amount * recipe.proteinPer100gr / 100;
    const carbohydrates = amount * recipe.carbohydratesPer100gr / 100;
    const fat = amount * recipe.fatPer100gr / 100;
    return {
      amount,
      calories,
      protein,
      carbohydrates,
      fat
    };
  }

  private findProducts(searchWord: string): Observable<Product[]> {
    return this.http.get<Product[]>(this._productsJSON).pipe(
      map(products => products.filter((product: Product) => product.name.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()))),
      tap((products: Product[]) => {
        const currentName = this.editRecipeForm.controls.ingredientName.value;
        if (products.filter((p: Product) => p.name === currentName).length === 0) {
          this.showProductList = true;
        } else {
          this.showProductList = false;
        }
      })
    );
  }
}
