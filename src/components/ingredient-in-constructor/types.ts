import { TIngredient } from "../../utils/types";

export type TIngredientInConstructorProps = {
    item: TIngredient,
    onDeleteHandler: (a: TIngredient) => void,
    moveIngredient: (a: number, b: number) => void,
    index: number,
};