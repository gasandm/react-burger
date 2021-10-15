import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { ru } from 'date-fns/esm/locale';
import { useSelector, useDispatch } from "../../utils/hooks";
import { wsGetOrders, wsClose } from "../../services/reducers/wsSlice";
import IngredientIcons from "../ingredient-icons/ingredient-icons";
import styles from "./feed.module.scss";


const Feed = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(wsGetOrders("wss://norma.nomoreparties.space/orders/all"));

        return () => {
            dispatch(wsClose());
        };
    }, [dispatch]);

    const orders = useSelector((store) => store.orders);
    const ingredients = useSelector((store) => store.ingredients.ingredients);

    if (orders.orders && ingredients) {
        return (
            <main className={styles.feedTable}>
                <span className="text text_type_main-large mt-40">
                    Лента заказов
                </span>
                <section className={styles.ordersBlock}>
                    {orders.orders.map((item, index) => {
                        return (
                            <Link key={index} to={{ pathname: `/feed/${item.number}`, state: { background: location }}}>
                                <div className={styles.feedOrder}>
                                    <div className={styles.feedOrderTop}>
                                        <span className="text text_type_digits-default">
                                            #{item.number}
                                        </span>
                                        <span className="text text_type_main-default text_color_inactive">
                                            {format(new Date(Date.parse(item.updatedAt)), 'dd MMM kk:mm O', {locale:ru})}
                                        </span>
                                    </div>
                                    <div className={`${styles.burgerName} text text_type_main-medium`}>
                                        <div>{item.name}</div>
                                        
                                    </div>
                                    <div className={styles.orderDetails}>
                                        <IngredientIcons order={item} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </section>
                <section className={styles.ordersInfoMain}>
                    <div className={styles.ordersInfoTop}>
                        <div className={styles.ordersInfoDone}>
                            <span className="text text_type_main-medium">
                                Готовы:
                            </span>
                            <div className={styles.ordersInfoNumbers}>
                                {orders.orders
                                    .filter((item) => item.status === "done")
                                    .map((item, index) => {
                                        if (index < 10) {
                                            return (
                                                <span key={index}
                                                    className={`${styles.doneNum} mb-2 text text_type_digits-default`}
                                                >
                                                    {item.number}
                                                </span>
                                            );
                                        } else return null
                                    })}
                            </div>
                        </div>
                        <div className={styles.ordersInfoDone}>
                            <span className="text text_type_main-medium">
                                В работе:
                            </span>
                            <div className={styles.ordersInfoNumbers}>
                                {orders.orders
                                    .filter((item) => item.status !== "done")
                                    .map((item, index) => {
                                        if (index < 10) {
                                            return (
                                                <span key={index} className="text mb-2 text_type_digits-default">
                                                    {item.number}
                                                </span>
                                            );
                                        } else return null;
                                    })}
                            </div>
                        </div>
                    </div>
                    <div className={styles.ordersInfoBottom}>
                        <div
                            className={`${styles.doneText} text text_type_main-medium`}
                        >
                            Выполнено за все время:
                        </div>
                        <div className="text mb-6 text_type_digits-large">
                            {orders.total}
                        </div>
                        <div
                            className={`${styles.doneText} text text_type_main-medium`}
                        >
                            Выполнено за сегодня:
                        </div>
                        <div className="text text_type_digits-large">
                            {orders.totalToday}
                        </div>
                    </div>
                </section>
            </main>
        );
    } else return null
};

export default Feed;
