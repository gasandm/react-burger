import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToDetails, removeFromDetails } from "../../services/reducers/ingredientsSlice";
import styles from "./burger-ingredients.module.scss";
import Tabs from "../tabs/tabs";
import IngredientSection from "../ingredient-section/ingredient-section";
import { ILocation } from "../../utils/types";

const BurgerIngredients = () => {
    const dispatch = useDispatch()
    const location = useLocation<ILocation>()
    const [nearest, setNearest] = useState("bun");

    const scrollContainerRef = useRef(null) as any;
    const bunRef = useRef(null) as any;
    const sauceRef = useRef(null) as any;
    const mainRef = useRef(null) as any;

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

    function toggleDetails(item?: any) {
        if(item._id) {
            dispatch(addToDetails(item))
        } else {
            dispatch(removeFromDetails(123))
            // @ts-ignore
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
