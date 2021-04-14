import { Food } from "./food.model";

export class Product implements Food {
    constructor(
        public name: string,
        public brand: string,
        public caloriePer100gr: number,
        public proteinPer100gr = 0,
        public carbohydratesPer100gr = 0,
        public fatPer100gr = 0
    ) {}

    static fromFormGroupValue(value: Partial<Product>) {
        return new Product(value.name, 
            value.brand, 
            value.caloriePer100gr, 
            value.proteinPer100gr ? value.proteinPer100gr : 0, 
            value.carbohydratesPer100gr ? value.carbohydratesPer100gr : 0, 
            value.fatPer100gr ? value.fatPer100gr : 0
        );
    }
}
