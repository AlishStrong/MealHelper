export function consumedAmount(amountConsumed: number, per100gr: number): number {
    return amountConsumed * per100gr / 100;
};

export function calculatePer100gr(toCalculate: number, foodAmount: number): number {
    return 100* toCalculate / foodAmount;
}
