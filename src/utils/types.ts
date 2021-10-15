export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    qty: number;
    type: string;
    _id: string;
    __v?: any
};

export interface ILocation {
    state: string;
    background: string;
    from?: string;
    push(a: string): void;
}