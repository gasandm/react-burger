import React from "react";
import AppHeader from "./../../components/app-header/app-header";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import styles from "./app.module.scss";
import "macro-css";
import { IngredientsContext } from '../../services/appContext';

const API = "https://norma.nomoreparties.space/api/ingredients";

function App() {
    const [data, setData] = React.useState([]);
    const [isLoaded, setisLoaded] = React.useState(false);

    React.useEffect(() => {
        fetch(API, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
            .then((res) => res.json())
            .then((result) => {
                setData(result.data);
                setisLoaded(true);
            })
            .catch((error) => {
                alert(error);
            });
    }, []);

    return (
        <>
            <AppHeader />
            {isLoaded && (
                <main className={styles.burgerTable}>
                    <span className="text text_type_main-large mt-40">
                        Соберите бургер
                    </span>
                    <IngredientsContext.Provider value={ data }>
                        <BurgerIngridients />
                        <BurgerConstructor />
                    </IngredientsContext.Provider>
                </main>
            )}
        </>
    );
}

export default App;
