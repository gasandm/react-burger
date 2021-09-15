import { SideMenu } from "../side-menu/side-menu";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import IngredientIcons from "../ingredient-icons/ingredient-icons";
import { Link, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/functions";
import { wsGetOrders, wsClose } from "../../services/reducers/wsSlice";
import { format } from "date-fns";
import { ru } from "date-fns/esm/locale";
import styles from "./profile-orders.module.scss";


export default function ProfileOrders() {
    const dispatch = useDispatch();
    const location = useLocation();

    const aToken = getCookie("accessToken");
    const accessToken = aToken.split("Bearer ")[1];

    useEffect(() => {
        dispatch(wsGetOrders("wss://norma.nomoreparties.space/orders?token=" + accessToken));

        return () => {
            dispatch(wsClose());
        };
    }, [dispatch]);

    const orders = useSelector((store) => store.orders.orders);

    if (orders) {
        return (
            <div className={styles.mainProfile}>
                <SideMenu />
                <section className={styles.ordersBlock}>
                    {orders.map((item, index) => {
                        return (
                            <Link key={index} to={{ pathname: `/profile/orders/${item.number}`, state: { background: location }}}>
                                <div className={styles.feedOrder}>
                                    <div className={styles.feedOrderTop}>
                                        <span className="text text_type_digits-default">
                                            #{item.number}
                                        </span>
                                        <span className="text text_type_main-default text_color_inactive">
                                            {format(new Date(Date.parse(item.updatedAt)), "PPP в kk:mm O", { locale: ru })}
                                        </span>
                                    </div>
                                    <div className="mt-6 text text_type_main-medium">
                                        I{item.name}
                                    </div>
                                    <div style={{color: item.status === 'done' ? '#00CCCC' : ''}} className={`${styles.orderStatus} mt-2 text text_type_main-small`}>
                                        {item.status === 'done' ? 'Выполнен' : 'Создан'}
                                    </div>
                                    <div className={styles.orderDetails}>
                                        <IngredientIcons order={item} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </section>
            </div>
        );
    } else return null;
}
