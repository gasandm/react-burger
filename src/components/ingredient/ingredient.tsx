import { useDrag } from "react-dnd";
import styles from "./ingredient.module.scss";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";

const Ingredient = (props: {item: TIngredient, toggleDetails: (a: TIngredient) => void}) => {
    const { _id, image, price, name, __v } = props.item;

    const [, dragRef] = useDrag({
        type: "ingredient",
        item: {_id}
    });

    return (
        <div ref={dragRef} onClick={() => props.toggleDetails(props.item)} className={styles.ingredient}>
            <div className={styles.counter}>
                <Counter count={__v} size="default" />
            </div>
            <img src={image} alt={name} />
            <div className={styles.priceWrapper}>
                <span className={`${styles.ingredientPrice} mr-5`}>{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles.ingredientTitle} text text_type_main-default`}>{name}</p>
        </div>
    );
};

export default Ingredient;
