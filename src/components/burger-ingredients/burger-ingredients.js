import React from "react";
import styles from "./burger-ingredients.module.scss";
import Tabs from "../tabs/tabs";
import IngredientSection from "../ingredient-section/ingredient-section";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = () => {

    const API = "https://norma.nomoreparties.space/api/ingredients";

    const [nearest, setNearest] = React.useState("bun");
    
    const scrollContainerRef = React.useRef(null);
    const bunRef = React.useRef(null);
    const sauceRef = React.useRef(null);
    const mainRef = React.useRef(null);

    const handleScroll = () => {
        // Сравниваем расстояния от заголовков до верхней части скроллящегося контейнера
        const scrollContainerPosition = scrollContainerRef.current.getBoundingClientRect().top;
        const firstHeaderPosition = bunRef.current.getBoundingClientRect().top;
        const secondHeaderPosition = sauceRef.current.getBoundingClientRect().top;
        const thirdHeaderPosition = mainRef.current.getBoundingClientRect().top;

        const firstDiff = Math.abs(scrollContainerPosition - firstHeaderPosition);
        const secondDiff = Math.abs(scrollContainerPosition - secondHeaderPosition);
        const thirdDiff = Math.abs(scrollContainerPosition - thirdHeaderPosition);
    
        if (firstDiff < secondDiff) {
          setNearest("bun");
        } else if (secondDiff < thirdDiff) {
          setNearest("sauce");
        } else {
          setNearest("main");
        }
    };

    const tabs = {
        activeTab: nearest,
        tabs: [
            {
                id: "bun",
                title: "Булки",
                ref: bunRef
            },
            {
                id: "sauce",
                title: "Соусы",
                ref: sauceRef
            },
            {
                id: "main",
                title: "Начинки",
                ref: mainRef
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
            <div ref={scrollContainerRef} onScroll={handleScroll} className={styles.ingredients}>
                {tabs.tabs.map((item, index) => {
                    return (
                    <IngredientSection toggleDetails={toggleDetails} key={index} tab={item}/>
                    )
                })}
            </div>
        </section>
    );
};

export default BurgerIngredients;
