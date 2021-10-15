import { useParams } from "react-router-dom";
import { useSelector } from "../../utils/hooks";
import { useHistory } from "react-router-dom";
import {
    CurrencyIcon,
    CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { format } from "date-fns";
import { ru } from "date-fns/esm/locale";
import ModalOverlay from "../modal-overlay/modal-overlay";

import styles from "./order-modal.module.scss";

const OrderModal = () => {
    const { id }: {id: string} = useParams();
    const history = useHistory();

    const ingredients = useSelector((store) => store.ingredients.ingredients);
    const orders = useSelector((store) => store.orders.orders);
    const order = orders.find(item => item.number === parseInt(id));

    var totalPrice = 0;
    var showed: string[] = [];

    const goBack = () => {
        history.goBack();
    }

    if (order) {
        return (
            <ModalOverlay toggleModal={goBack}>
                <div
                    className={styles.modal}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.orderMain}>
                        <div className="d-flex justify-between text text_type_digits-default">
                            #{order.number}
                            <div
                                className="cu-p"
                                onClick={goBack}
                            >
                                <CloseIcon type="primary" />
                            </div>
                        </div>
                        <div className={`${styles.burgerName} text text_type_main-medium mt-40`}>
                            {order.name}
                        </div>
                        <div
                            className={`${styles.doneText} mt-3 text text_type_main-medium`}
                        >
                            {order.status === "done" ? "Выполнен" : "В работе"}
                        </div>
                        <div className="text text_type_main-large">Состав:</div>
                        <div className={styles.ingrScroll}>
                            {order.ingredients.map((item, index) => {
                                const ingrInfo = ingredients.find(
                                    (ingr) => ingr._id === item
                                );
                                const howMany = order.ingredients.filter(
                                    (ingr) => ingr === item
                                ).length;
                                if(ingrInfo) {
                                    totalPrice += ingrInfo.price;
                                    if (!showed.includes(ingrInfo._id)) {
                                        showed.push(ingrInfo._id);
                                        return (
                                            <div key={index} className={styles.ingrLine}>
                                                <div className={styles.miniIngr}>
                                                    <img
                                                        className={
                                                            styles.miniIngrImage
                                                        }
                                                        src={ingrInfo.image}
                                                    />
                                                </div>
                                                <span className="flex text text_type_main-default ml-4">
                                                    {ingrInfo.name}
                                                </span>
                                                <div
                                                    className={`${styles.orderPriceForOne} text text_type_digits-default`}
                                                >
                                                    {howMany +
                                                        " x " +
                                                        ingrInfo.price}
                                                    <CurrencyIcon type="primary" />
                                                </div>
                                            </div>
                                        );
                                    } else return null;
                                } else return null;
                            })}
                        </div>
                        <div className={styles.OrderInfoBottom}>
                            <span className="text text_type_main-default text_color_inactive">
                                {format(
                                    new Date(Date.parse(order.updatedAt)),
                                    "PPP в kk:mm O",
                                    { locale: ru }
                                )}
                            </span>
                            <div
                                className={`${styles.orderPrice} text text_type_digits-default`}
                            >
                                {totalPrice}
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalOverlay>
        );
    } else return null;
};

export default OrderModal;
