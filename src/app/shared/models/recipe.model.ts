import { Food } from './food.model';

export interface Ingredient extends Food {
  amount: number;
  brand?: string;
}

export interface Portion {
  amount: number;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface Ingredients extends Array<Ingredient> { }

export class Recipe implements Food {
  constructor(
    public name: string,
    public ingredients: Ingredients,
    public caloriePer100gr: number,
    public proteinPer100gr = 0,
    public carbohydratesPer100gr = 0,
    public fatPer100gr = 0,
    public portions = 1,
    public steps = new Map<number, string>()
  ) { }

  static fromFormGroupValue(value: Partial<Recipe>) {
    return new Recipe(
      value.name,
      value.ingredients,
      value.caloriePer100gr,
      value.proteinPer100gr ? value.proteinPer100gr : 0,
      value.carbohydratesPer100gr ? value.carbohydratesPer100gr : 0,
      value.fatPer100gr ? value.fatPer100gr : 0,
      value.portions,
      value.steps ? value.steps : new Map<number, string>()
    );
  }
}
