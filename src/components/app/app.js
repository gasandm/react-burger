import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from "../app-header/app-header";
import BurgerIngridients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import IngredientPage from "../ingredient-details/ingredient-page";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/protected-route";
import { ProtectedAuthRoute } from "../protected-auth-route/protected-auth-route";
import { fetchIngredients } from "../../services/reducers/ingredientsSlice";
import { LoginPage, NotFound, RegisterPage, ResetPassword, ForgotPassword, ProfilePage } from '../../pages';

import styles from "./app.module.scss";
import "macro-css";

function App() {
    const location = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const background = history.action === 'PUSH' && location.state && location.state.background

    React.useEffect(() => {
        dispatch(fetchIngredients());
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <Switch location={background || location}>
                <Route path="/" exact={true}>
                    <main className={styles.burgerTable}>
                        <span className="text text_type_main-large mt-40">
                            Соберите бургер
                        </span>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngridients />
                            <BurgerConstructor />
                        </DndProvider>
                    </main>
                </Route>
                <Route path="/ingredients/:id" exact={true}>
                    <IngredientPage />
                </Route>
                <ProtectedAuthRoute path="/login" exact={true}>
                    <LoginPage/>
                </ProtectedAuthRoute>
                <ProtectedAuthRoute path="/register" exact={true}>
                    <RegisterPage/>
                </ProtectedAuthRoute>
                <ProtectedAuthRoute path="/reset-password" exact={true}>
                    <ResetPassword/>
                </ProtectedAuthRoute>
                <ProtectedAuthRoute path="/forgot-password" exact={true}>
                    <ForgotPassword/>
                </ProtectedAuthRoute>
                <ProtectedRoute path="/profile" exact={false}>
                    <ProfilePage/>
                </ProtectedRoute>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>

            {background && <Route path="/ingredients/:id" children={<IngredientDetails />} />} 
        </>
    );
}

export default App;
