import React from "react";
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import styles from "./ingredient.module.scss";
import {
    CurrencyIcon,
    Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredient = (props) => {
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

Ingredient.propTypes = { 
    toggleDetails: PropTypes.func,
    item: PropTypes.object.isRequired
};

export default Ingredient;
