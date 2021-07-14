import React from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import styles from "./ingredient-details.module.scss";
import {
    CloseIcon
} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const IngredientDetails = (props) => {

    return ReactDOM.createPortal(
        (
            <ModalOverlay>
                <div className={styles.modal}>
                    <div className={`${styles.details} text text_type_main-large mt-40 ml-40`}>
                        <span>Детали ингредиента</span>
                        <div className={styles.closeButton} onClick={props.toggleIngredientDetails}>
                            <CloseIcon type="primary" />
                        </div>
                    </div>
                    <img className={styles.ingredientImage} src={props.item.image} alt="ingredient"/>
                    <span className={`${styles.ingredientName} text text_type_main-medium mt-15`}>{props.item.name}</span>
                    <div className={styles.ingredientEnergyMain}>
                        <div className={`${styles.ingredientEnergy} mr-20`}>
                            <span>Калории,ккал</span>
                            <span className="text text_type_digits-default">{props.item.calories}</span>
                        </div>
                        <div className={`${styles.ingredientEnergy} mr-20`}>
                            <span>Белки, г</span>
                            <span className="text text_type_digits-default">{props.item.proteins}</span>
                        </div>
                        <div className={`${styles.ingredientEnergy} mr-20`}>
                            <span>Жиры, г</span>
                            <span className="text text_type_digits-default">{props.item.fat}</span>
                        </div>
                        <div className={styles.ingredientEnergy}>
                            <span>Углеводы, г</span>
                            <span className="text text_type_digits-default">{props.item.carbohydrates}</span>
                        </div>
                    </div>
                </div>
            </ModalOverlay> 
        ), modalRoot
    );
};

IngredientDetails.propTypes = { 
    toggleIngredientDetails: PropTypes.func,
    item: PropTypes.object
};

export default IngredientDetails;