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
import Feed from "../feed/feed";
import OrderInfo from "../order-info/order-info";
import OrderModal from "../order-modal/order-modal";
import ProfileOrders from "../profile-orders/profile-orders";
import { ProtectedRoute } from "../protected-route/protected-route";
import { ProtectedAuthRoute } from "../protected-auth-route/protected-auth-route";
import { fetchIngredients } from "../../services/reducers/ingredientsSlice";
import { LoginPage, NotFound, RegisterPage, ResetPassword, ForgotPassword, ProfilePage } from '../../pages';

import styles from "./app.module.scss";
import "macro-css";
import { ILocation } from "../../utils/types";

const App: React.FC = () => {
    const location = useLocation<ILocation>()
    const history = useHistory()
    const dispatch = useDispatch()
    const background: any = history.action === 'PUSH' && location.state && location.state.background

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
                <Route path="/feed/" exact={true}>
                    <Feed />
                </Route>
                <Route path="/feed/:id" exact={true}>
                    <OrderInfo />
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
                <ProtectedRoute path="/profile" exact={true}>
                    <ProfilePage/>
                </ProtectedRoute>
                <ProtectedRoute path="/profile/orders" exact={true}>
                    <ProfileOrders/>
                </ProtectedRoute>
                <Route path="/profile/orders/:id" exact={true}>
                    <OrderInfo />
                </Route>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>

            {background && <Route path="/ingredients/:id" children={<IngredientDetails />} />} 
            {background && <Route path="/feed/:id" children={<OrderModal />} />} 
            {background && <Route path="/profile/orders/:id" children={<OrderModal />} />} 
        </>
    );
}

export default App;
