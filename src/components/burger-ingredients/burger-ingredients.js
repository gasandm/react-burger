import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToDetails, removeFromDetails } from "../../services/reducers/ingredientsSlice";
import styles from "./burger-ingredients.module.scss";
import Tabs from "../tabs/tabs";
import IngredientSection from "../ingredient-section/ingredient-section";

const BurgerIngredients = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const [nearest, setNearest] = useState("bun");

    const scrollContainerRef = useRef(null);
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);

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

    function toggleDetails(item) {
        if(item._id) {
            dispatch(addToDetails(item))
        } else {
            dispatch(removeFromDetails())
            location.push('/')
        } 
    }

    return (
        <section className={styles.ingredientsBlock}>
            <nav className={styles.tabsNav}>
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
