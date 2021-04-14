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
}
