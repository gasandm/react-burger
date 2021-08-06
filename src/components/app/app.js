import React from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from "./../../components/app-header/app-header";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import { fetchIngredients } from "../../services/reducers/ingredientsSlice";

import styles from "./app.module.scss";
import "macro-css";

const API = "https://norma.nomoreparties.space/api/ingredients";

function App() {

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <main className={styles.burgerTable}>
                <span className="text text_type_main-large mt-40">
                    Соберите бургер
                </span>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngridients />
                    <BurgerConstructor />
                </DndProvider>
            </main>
        </>
    );
}

export default App;
