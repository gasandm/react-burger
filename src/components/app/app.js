import React from "react";
import AppHeader from "./../../components/app-header/app-header";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import styles from "./app.module.scss";
import data from "./../../utils/data.js";
import "macro-css";
import OrderAccepted from "../order-accepted/order-accepted";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
    return (
        <>
            {/* <OrderAccepted /> */}
            {/* <IngredientDetails
                ingredient={{
                    image: "https://code.s3.yandex.net/react/code/meat-01-large.png",
                    name: "Биокотлета из марсианской Магнолии",
                    proteins: 234,
                    fat: 432,
                    carbohydrates: 111,
                    calories: 189,
                }}
            /> */}
            <AppHeader />
            <main className={styles.burgerTable}>
                <span className="text text_type_main-large mt-40">
                    Соберите бургер
                </span>
                <BurgerIngridients data={data} />
                <BurgerConstructor data={data} />
            </main>
        </>
    );
}

export default App;
