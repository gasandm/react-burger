import React from "react";
import { useSelector } from "react-redux";
import Ingredient from "../ingredient/ingredient";
import PropTypes from 'prop-types';
import styles from "./ingredient-section.module.scss";


const IngredientSection = (props) => {

    const ingredients = useSelector(store => store.ingredients.ingredients);

    return (
        <>
            <span ref={props.tab.ref} className={`${styles.sectionTitle} text text_type_main-default mb-25`}>{props.tab.title}</span>
            <div className={styles.shortList}>
                {ingredients.map((item) => {
                    if (item.type === props.tab.id) {
                        return (
                            <Ingredient toggleDetails={props.toggleDetails} key={item._id} item={item} />
                        )
                    }
                })}
            </div>
        </>
    );
};

IngredientSection.propTypes = {
    toggleDetails: PropTypes.func.isRequired,
    tab: PropTypes.object.isRequired
};

export default IngredientSection;