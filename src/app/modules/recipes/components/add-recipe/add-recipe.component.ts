import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Food } from 'src/app/shared/models/food.model';
import { Product } from 'src/app/shared/models/product.model';
import { Recipe } from 'src/app/shared/models/recipe.model';

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
  ingredientList = new Map<string, number>();

  recipeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    ingredients: new FormControl(this.ingredientList, Validators.required),
    ingredientName: new FormControl('', [Validators.required]),
    ingredientAmount: new FormControl(null, [Validators.required, Validators.min(1)])
    // caloriePer100gr: new FormControl(0, [Validators.required, Validators.min(0)]),
    // proteinPer100gr: new FormControl(0, [Validators.max(100), Validators.min(0)]),
    // carbohydratesPer100gr: new FormControl(0, [Validators.max(100), Validators.min(0)]),
    // fatPer100gr: new FormControl(0, [Validators.max(100), Validators.min(0)])
  });

  constructor() { }

  ngOnInit() {
  }

  addNewRecipe(): void {
    const newRecipe = Recipe.fromFormGroupValue(this.recipeForm.value);
    console.log(newRecipe);
  }

  removeIngredient(ingredientName: string): void {
    this.ingredientList.delete(ingredientName);
  }

  addIngredient(): void {
    this.ingredientList.set(
      this.recipeForm.controls.ingredientName.value,
      this.recipeForm.controls.ingredientAmount.value,
    );
    this.recipeForm.controls.ingredientName.reset();
    this.recipeForm.controls.ingredientAmount.reset();
  }
}
