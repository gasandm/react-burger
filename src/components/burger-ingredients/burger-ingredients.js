import React from "react";
import PropTypes from 'prop-types';
import styles from "./burger-ingredients.module.scss";
import Tabs from "../tabs/tabs";
import IngredientSection from "../ingredient-section/ingredient-section";

const BurgerIngredients = (props) => {

    const tabs = {
        activeTab: "bun",
        tabs: [
            {
                id: "bun",
                title: "Булки",
            },
            {
                id: "sauce",
                title: "Соусы",
            },
            {
                id: "main",
                title: "Начинки",
            },
        ],
    };

    return (
        <section className={styles.ingredientsBlock}>
            <nav>
                <Tabs tabs={tabs} />
            </nav>
            <div className={styles.ingredients}>
                {tabs.tabs.map((item, index) => {
                    return (
                    <IngredientSection key={index} tab={item} data={props.data}/>
                    )
                })}
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = { data: PropTypes.arrayOf(PropTypes.object) };

export default BurgerIngredients;
