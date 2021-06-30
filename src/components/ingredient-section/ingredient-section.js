import React from "react";
import Ingredient from "../ingredient/ingredient";
import PropTypes from 'prop-types';
import styles from "./ingredient-section.module.scss";

const IngredientSection = (props) => {

    return (
        <>
            <span className="text text_type_main-default mb-25">{props.tab.title}</span>
            <div className={styles.shortList}>
                {props.data.map((item) => {
                    if (item.type === props.tab.id) {
                        return (
                            <Ingredient key={item._id} item={item} />
                        )
                    }
                })}
            </div>
        </>
    );
};

IngredientSection.propTypes = { data: PropTypes.arrayOf(PropTypes.object) };

export default IngredientSection;