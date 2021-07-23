import React, { useContext } from "react";
import PropTypes from 'prop-types';
import styles from "./burger-ingredients.module.scss";
import Tabs from "../tabs/tabs";
import IngredientSection from "../ingredient-section/ingredient-section";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientsContext } from '../../services/appContext';


const BurgerIngredients = () => {

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

    const[isDetailsActive, setIsDetailsActive] = React.useState(false);
    const[activeItem, setActiveItem] = React.useState({});

    function toggleDetails(item = null) {
        setIsDetailsActive(!isDetailsActive);
        setActiveItem(item);
    }

    return (
        <section className={styles.ingredientsBlock}>
            {isDetailsActive && <IngredientDetails item={activeItem} toggleModal={toggleDetails}/>}
            <nav>
                <Tabs tabs={tabs} />
            </nav>
            <div className={styles.ingredients}>
                {tabs.tabs.map((item, index) => {
                    return (
                    <IngredientSection toggleDetails={toggleDetails} key={index} tab={item}/>
                    )
                })}
            </div>
        </section>
    );
};

BurgerIngredients.propTypes = { data: PropTypes.arrayOf(PropTypes.object) };

export default BurgerIngredients;
