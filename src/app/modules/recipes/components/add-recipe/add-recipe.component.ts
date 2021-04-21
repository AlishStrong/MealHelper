import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {
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
    this.recipeForm.controls.ingredientName.setValue(product.name);
    this.recipeForm.controls.ingredientBrand.setValue(product.brand);
    this.recipeForm.controls.ingredientAmount.enable({ onlySelf: true });
  }

  // TODO check that ingredient is already in the list or not
  // TODO update caloric and macro info of the Recipe
  addIngredient(): void {
    this.ingredientList.push({
      name: this.recipeForm.controls.ingredientName.value,
      brand: this.recipeForm.controls.ingredientBrand.value,
      amount: this.recipeForm.controls.ingredientAmount.value
    });
    this.recipeForm.controls.ingredientName.reset('');
    this.recipeForm.controls.ingredientBrand.reset();
    this.recipeForm.controls.ingredientAmount.reset();
  }

  // TODO use Product as a parameter
  // TODO update caloric and macro info of the Recipe
  removeIngredient(ingredientName: string): void {
    this.ingredientList = this.ingredientList.filter((ingredient: Ingredient) => ingredient.name !== ingredientName);
  }

  // TODO clear the form when a Recipe is added
  addNewRecipe(): void {
    const newRecipe = Recipe.fromFormGroupValue(this.recipeForm.value);
    console.log(newRecipe);
  }

  private findProducts(searchWord: string) {
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
