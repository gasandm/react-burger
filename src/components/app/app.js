import React from "react";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from "./../../components/app-header/app-header";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import { IngredientsContext } from "../../services/appContext";
import { fetchIngredients } from "../../services/reducers/ingredientsSlice";

import styles from "./app.module.scss";
import "macro-css";

const API = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [data, setData] = React.useState([]);
    const [isLoaded, setisLoaded] = React.useState(false);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchIngredients());
        fetch(API, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((result) => {
                setData(result.data);
                setisLoaded(true);
            })
            .catch((error) => {
                setisLoaded(false);
                alert(error);
            });
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            {isLoaded && (
                <main className={styles.burgerTable}>
                    <span className="text text_type_main-large mt-40">
                        Соберите бургер
                    </span>
                    <IngredientsContext.Provider value={data}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngridients />
                            <BurgerConstructor />
                        </DndProvider>
                    </IngredientsContext.Provider>
                </main>
            )}
        </>
    );
}

export default App;
