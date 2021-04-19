import { Food } from './food.model';

export class Recipe implements Food {
    constructor(
        public name: string,
        public ingredients: Food[],
        public caloriePer100gr: number,
        public proteinPer100gr = 0,
        public carbohydratesPer100gr = 0,
        public fatPer100gr = 0,
        public steps = new Map<number, string>()
    ) {}

    static fromFormGroupValue(value: Partial<Recipe>) {
        return new Recipe(
            value.name,
            value.ingredients,
            value.caloriePer100gr,
            value.proteinPer100gr ? value.proteinPer100gr : 0,
            value.carbohydratesPer100gr ? value.carbohydratesPer100gr : 0,
            value.fatPer100gr ? value.fatPer100gr : 0,
            value.steps ? value.steps : new Map<number, string>()
        );
    }
}
