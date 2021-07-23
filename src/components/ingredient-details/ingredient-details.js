import React from "react";
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.scss";
import Modal from "../modal/modal";

const IngredientDetails = (props) => {
    return (
        <Modal modalTitle="Детали ингредиента" toggleModal={props.toggleModal}>
            <img
                className={styles.ingredientImage}
                src={props.item.image}
                alt="ingredient"
            />
            <span
                className={`${styles.ingredientName} text text_type_main-medium mt-15`}
            >
                {props.item.name}
            </span>
            <div className={styles.ingredientEnergyMain}>
                <div className={`${styles.ingredientEnergy} mr-20`}>
                    <span>Калории,ккал</span>
                    <span className="text text_type_digits-default">
                        {props.item.calories}
                    </span>
                </div>
                <div className={`${styles.ingredientEnergy} mr-20`}>
                    <span>Белки, г</span>
                    <span className="text text_type_digits-default">
                        {props.item.proteins}
                    </span>
                </div>
                <div className={`${styles.ingredientEnergy} mr-20`}>
                    <span>Жиры, г</span>
                    <span className="text text_type_digits-default">
                        {props.item.fat}
                    </span>
                </div>
                <div className={styles.ingredientEnergy}>
                    <span>Углеводы, г</span>
                    <span className="text text_type_digits-default">
                        {props.item.carbohydrates}
                    </span>
                </div>
            </div>
        </Modal>
    );
};

IngredientDetails.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

export default IngredientDetails;
