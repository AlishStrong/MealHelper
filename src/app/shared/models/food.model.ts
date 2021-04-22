export interface Macronutrients {
  proteinPer100gr: number;
  carbohydratesPer100gr: number;
  fatPer100gr: number;
}

export interface Food extends Macronutrients {
  name: string;
  caloriePer100gr: number;
}
