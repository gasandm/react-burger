import React from "react";
import AppHeader from "./../../components/app-header/app-header";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "./../../components/burger-constructor/burger-constructor";
import styles from "./app.module.scss";
import "macro-css";
import OrderAccepted from "../order-accepted/order-accepted";
import IngredientDetails from "../ingredient-details/ingredient-details";

const API = 'https://norma.nomoreparties.space/api/ingredients';

function App() {

    const[data, setData] = React.useState([]);
    const[isLoaded, setisLoaded] = React.useState(false);

    React.useEffect(() => {
        fetch(API)
        .then(res => res.json())
        .then((result) => {
                setData(result.data);
                setisLoaded(true);
            }, 
            (error) => {
                alert(error);
            }
        )
    }, []);

    return (
        <>
            <AppHeader />
            { isLoaded &&
            <main className={styles.burgerTable}>
                <span className="text text_type_main-large mt-40">Соберите бургер</span>
                <BurgerIngridients data={data} />
                <BurgerConstructor data={data} />
            </main>
            }
        </>
    );
}

export default App;
