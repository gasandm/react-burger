import React from "react";
import styles from "./ingredient-details.module.scss";
import {
    CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientDetails = (props) => {

    return (
        <div className={styles.IngredientDetailMain}>
            <div className={styles.modal}>
                <div className={`${styles.details} text text_type_main-large mt-40 ml-40`}>
                    <span>Детали ингредиента</span>
                    <CloseIcon type="primary" />
                </div>
                <img className={styles.ingredientImage} src={props.ingredient.image}/>
                <span className={`${styles.ingredientName} text text_type_main-medium mt-15`}>{props.ingredient.name}</span>
                <div className={styles.ingredientEnergyMain}>
                    <div className={`${styles.ingredientEnergy} mr-20`}>
                        <span>Калории,ккал</span>
                        <span className="text text_type_digits-default">{props.ingredient.calories}</span>
                    </div>
                    <div className={`${styles.ingredientEnergy} mr-20`}>
                        <span>Белки, г</span>
                        <span className="text text_type_digits-default">{props.ingredient.proteins}</span>
                    </div>
                    <div className={`${styles.ingredientEnergy} mr-20`}>
                        <span>Жиры, г</span>
                        <span className="text text_type_digits-default">{props.ingredient.fat}</span>
                    </div>
                    <div className={styles.ingredientEnergy}>
                        <span>Углеводы, г</span>
                        <span className="text text_type_digits-default">{props.ingredient.carbohydrates}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default IngredientDetails;